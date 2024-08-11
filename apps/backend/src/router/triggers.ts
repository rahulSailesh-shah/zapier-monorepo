import { Request, Response, Router } from "express";
import { db } from "../db";
import { User, ZapCreateSchema } from "../types";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const triggers = await db.availableTriggers.findMany();

    res.status(200).json({ success: true, data: triggers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export const triggersRouter = router;
