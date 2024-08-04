import { Request, Response, Router } from "express";
import passport from "passport";
import { db } from "../db";
const router = Router();

const CLIENT_URL = process.env.AUTH_REDIRECT_URL ?? "http://localhost:5173";

interface User {
  id: string;
}

router.get("/refresh", async (req: Request, res: Response) => {
  if (req.user) {
    const user = req.user as User;

    const userDb = await db.user.findFirst({
      where: {
        id: user.id,
      },
    });

    res.json({
      id: user.id,
      name: userDb?.name,
    });
  } else {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
});

router.get("/login/failed", (req: Request, res: Response) => {
  res.status(401).json({ success: false, message: "failure" });
});

router.get("/logout", (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      console.error("Error logging out:", err);
      res.status(500).json({ error: "Failed to log out" });
    } else {
      res.clearCookie("jwt");
      res.redirect("http://localhost:5173/");
    }
  });
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["profile", "email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

export default router;
