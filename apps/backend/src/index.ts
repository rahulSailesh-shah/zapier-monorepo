import express from "express";
import cors from "cors";
import { initPassport } from "./passport";
import authRoute from "./router/auth";
import { zapRouter } from "./router/zap";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import { triggersRouter } from "./router/triggers";
import { actionsRouter } from "./router/actions";

const app = express();

dotenv.config();
app.use(
  session({
    secret: process.env.COOKIE_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Only use secure in production
      httpOnly: true,
      sameSite: "lax", // or 'strict'
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

initPassport();
app.use(passport.initialize());
app.use(passport.authenticate("session"));

const allowedHosts = process.env.ALLOWED_HOSTS
  ? process.env.ALLOWED_HOSTS.split(",")
  : [];

app.use(
  cors({
    origin: allowedHosts,
    credentials: true,
  })
);

app.use(express.json());

app.use("/auth", authRoute);
app.use("/api/zap", zapRouter);
app.use("/api/triggers", triggersRouter);
app.use("/api/actions", actionsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
