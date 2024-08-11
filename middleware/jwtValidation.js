import express from "express";
import jwt from "jsonwebtoken";
app.use(express.json());

const verfiyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).json({
      status: "FAIL",
      message: "Token is required",
    });
  }

  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: "FAIL",
        message: "Token is not valid",
        error: "unauthorized",
      });
    }
    req.userId = decoded.id;
    next();
  });
};
