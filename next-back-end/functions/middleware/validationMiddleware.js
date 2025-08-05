import express from "express";
import { z, ZodError } from "zod";

import { StatusCodes } from "http-status-codes";

/**
 * @param {z.ZodObject<any, any>} schema
 * @returns
 */
export function validateData(schema) {
  /**
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: "Invalid data", details: error.issues });
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: "Internal Server Error" });
      }
    }
  };
}
