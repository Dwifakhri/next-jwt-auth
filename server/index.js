import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
import http from "http";
const server = http.createServer(app);

const allowedOrigins = [
  "http://localhost:3000",
  "http://0.0.0.0:3000",
  "http://127.0.0.1:3000"
];
var corsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

const users = [
  {
    id: 1,
    email: "admin@mail.com",
    username: "admin",
    role: "admin",
    password: "123123"
  }
];

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const foundUser = users.find((user) => user.email === email);
  if (!foundUser || password !== foundUser.password) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const access_token = jwt.sign({ id: foundUser.id }, "shhhhh", {
    expiresIn: "2m"
  });
  const refresh_token = jwt.sign({ id: foundUser.id }, "shhhhh", {
    expiresIn: "1h"
  });
  return res.json({ access_token, refresh_token });
});

app.post("/api/refresh", (req, res) => {
  const { refresh_token } = req.body;

  try {
    const payload = jwt.verify(refresh_token, "shhhhh");
    const foundUser = users.find((user) => user.id === payload.id);
    if (!foundUser) {
      return res.status(401).json({ message: "Unauthorized" });
    } else {
      const access_token = jwt.sign({ id: foundUser.id }, "shhhhh", {
        expiresIn: "2m"
      });
      return res.json({ access_token });
    }
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
});

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "shhhhh");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

app.get("/api/protected", verifyJWT, (req, res) => {
  res.json({ message: "Welcome, authorized user!" });
});

app.get("/api/me", (req, res) => {
  const auth = req.headers.authorization.slice(7);
  try {
    const payload = jwt.verify(auth, "shhhhh");
    const me = users.find((item) => (item.id = payload.id));
    if (me) {
      return res.json({ ...me, password: undefined });
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
});

server.listen(8000, "0.0.0.0", () => {
  console.log(`Listening on http://localhost:${8000}`);
});
