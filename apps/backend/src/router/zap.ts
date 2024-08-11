import { Request, Response, Router } from "express";
import { db } from "../db";
import { User, ZapCreateSchema } from "../types";

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
