import { Request, Response, Router } from "express";
import { db } from "../db";
import { z } from "zod";
import { User, ZapCreateSchema, ZapUpdateSchema } from "../types";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = req.user as User;
    const body = req.body;
    const parsedData = ZapCreateSchema.safeParse(body);

    if (!parsedData.success) {
      console.log(parsedData.error);
      return res.status(411).json({
        body: {
          message: "Incorrect inputs",
        },
      });
    }

    const newZap = await db.$transaction(async (tx) => {
      return await tx.zap.create({
        data: {
          userId: user.id,
          trigger: {
            create: {
              triggerId: parsedData.data.availableTriggerId,
            },
          },
          action: {
            create: parsedData.data.actions.map((action, index) => ({
              actionId: action.availableActionId,
              sortingOrder: index,
            })),
          },
        },
      });
    });

    return res.status(200).json({ body: { zapId: newZap.id } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ body: { message: "Internal server error" } });
  }
});

router.patch("/:zapId", async (req, res) => {
  try {
    const { zapId } = req.params;
    const { triggerId, actions } = ZapUpdateSchema.parse(req.body);

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!triggerId && !actions) {
      return res.status(400).json({ error: "No updates provided" });
    }

    const updatedZap = await db.zap.update({
      where: { id: zapId },
      data: {
        ...(triggerId && {
          trigger: {
            update: { triggerId },
          },
        }),
        ...(actions && {
          action: {
            deleteMany: {},
            create: actions.map((action, index) => ({
              actionId: action.actionId,
              sortingOrder: index,
            })),
          },
        }),
        updatedAt: new Date(),
      },
      include: {
        trigger: true,
        action: {
          orderBy: {
            sortingOrder: "asc",
          },
        },
      },
    });

    res.json(updatedZap);
  } catch (error) {
    console.error("Error updating Zap:", error);
    if (error instanceof z.ZodError) {
      res
        .status(400)
        .json({ error: "Invalid input", details: (error as any).errors });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = req.user as User;
    const zaps = await db.zap.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    res.status(200).json(zaps);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:zapId", async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = req.user as User;
    const zapId = req.params.zapId;
    const zap = await db.zap.findFirst({
      where: {
        id: zapId,
        userId: user.id,
      },
      include: {
        action: true,
        trigger: true,
      },
    });

    if (!zap) {
      return res.status(404).json({ message: "Zap not found" });
    }

    return res.status(200).json(zap);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export const zapRouter = router;
