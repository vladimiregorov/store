import createError from "http-errors";
import express from "express";
import http from "http";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import session from "express-session";
import passport from "passport";
import { createUsers } from "./routes/register";
import { loginUsers } from "./routes/login";

const port = process.PORT || "3000";
const app = express();
const server = http.createServer(app);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "0GBlJZ9EKBt2Zbi2flRPvztczCewBxXK",
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: 60 * 60 * 1000
    },
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport");

app.post("/register", createUsers);

app.post("/login", loginUsers);

app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

app.use(function(req, res, next) {
  next(createError(404));
});

server.listen(port);
