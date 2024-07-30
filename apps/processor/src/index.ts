import { PrismaClient } from "@prisma/client";
import { Kafka, logLevel } from "kafkajs";

const TOPIC = "zap-events";
const CLIENT_ID = "outbox-processor";
const BROKER = "localhost:9092";
const BATCH_SIZE = 10;
const SWEEP_INTERVAL = 5000; // 5 seconds

const prisma = new PrismaClient();
const kafka = new Kafka({
  clientId: CLIENT_ID,
  brokers: [BROKER],
  logLevel: logLevel.INFO,
});

const producer = kafka.producer();

async function sweepAndProduce() {
  try {
    const pendingRows = await prisma.zapRunOutbox.findMany({
      where: {},
      take: BATCH_SIZE,
    });

    if (pendingRows.length === 0) {
      return;
    }

    const messages = pendingRows.map((row) => ({
      value: JSON.stringify(row.zapRunId),
    }));

    await producer.send({
      topic: TOPIC,
      messages,
    });

    await prisma.zapRunOutbox.deleteMany({
      where: {
        id: {
          in: pendingRows.map((row) => row.id),
        },
      },
    });

    console.log(`Processed and deleted ${pendingRows.length} rows.`);
  } catch (error) {
    console.error("Error in sweepAndProduce:", error);
  }
}

async function main() {
  try {
    await producer.connect();
    console.log("Producer connected. Starting sweep loop...");

    while (true) {
      await sweepAndProduce();
      await new Promise((resolve) => setTimeout(resolve, SWEEP_INTERVAL));
    }
  } catch (error) {
    console.error("Fatal error:", error);
  } finally {
    await cleanup();
  }
}

async function cleanup() {
  console.log("Cleaning up...");
  await producer.disconnect();
  await prisma.$disconnect();
}

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);

main().catch(console.error);
