import express, { Request, Response } from "express";
import { SERVER_API_KEY } from "../config";

export const authenticateAPIKey = function (
  req: Request,
  res: Response,
  next: any
) {
  // if (!req.headers.authorization) {
  //   throw Error("Wrong Authorization Token");
  // }
  // const serverKey = req.headers.authorization;

  // if (serverKey !== SERVER_API_KEY) {
  //   res
  //     .status(403)
  //     .send({ auth: false, message: "Wrong Authorization Token!" });
  // }
  next();
};
