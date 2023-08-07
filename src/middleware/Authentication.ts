import { Request } from "express";
import { verify } from "jsonwebtoken";
import { SECRET_KEY } from "../Env";

export enum SecurityType {
  JWT = "JWT",
}

export async function expressAuthentication(
  req: Request,
  securityName: string,
  scopes?: string[]
): Promise<void> {
  if (securityName === SecurityType.JWT) {
    const token =
      req.body.token ||
      req.headers["Authorization"] ||
      req.headers["x-access-token"];

    return new Promise((resolve, reject) => {
      if (!token) {
        reject(new Error("No token provided"));
      }
      verify(token, SECRET_KEY, function (err: any, decoded: any) {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  }
}
