import { PrismaClient } from "@prisma/client";
import { Kafka, logLevel } from "kafkajs";

const TOPIC = "zap-events";
const CLIENT_ID = "outbox-processor";
const GROUP_ID = "outbox-processor-group";
const BROKER = "localhost:9092";

const prisma = new PrismaClient();
const kafka = new Kafka({
  clientId: CLIENT_ID,
  brokers: [BROKER],
  logLevel: logLevel.INFO,
});

const consumer = kafka.consumer({ groupId: GROUP_ID });

const processMessage = async (message: any) => {
  console.log({
    offset: message.offset,
    value: message.value.toString(),
  });

  await new Promise((resolve) => setTimeout(resolve, 500));

  console.log("Completed processing message");
};

const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: TOPIC, fromBeginning: true });

  await consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, partition, message }) => {
      try {
        await processMessage(message);
        await consumer.commitOffsets([
          {
            topic,
            partition,
            offset: (parseInt(message.offset) + 1).toString(),
          },
        ]);
      } catch (error) {
        console.error(`Error processing message: ${error}`);
      }
    },
  });
};

const shutdown = async () => {
  console.log("Shutting down gracefully...");
  await consumer.disconnect();
  await prisma.$disconnect();
  process.exit(0);
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

runConsumer().catch((error) => {
  console.error(`Error in consumer: ${error}`);
  process.exit(1);
});
