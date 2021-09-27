import { Express, Request, Response } from "express";
import {
  createProductHandler,
  updateProductHandler,
  getProductHandler,
  deleteProductHandler,
} from "./controller/product.controller";
import { createUserHandler } from "./controller/user.controller";
import {
  createUserSessionHandler,
  invalidateUserSessionHandler,
  getUserSessionsHandler,
} from "./controller/session.controller";
import { validateRequest, requiresUser } from "./middleware";
import {
  createUserSchema,
  createUserSessionSchema,
} from "./schema/user.schema";
import {
  createProductSchema,
  updateProductSchema,
  deleteProductSchema,
  readProductSchema,
} from "./schema/product.schema";

export default function (app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  // Register user
  app.post("/api/users", validateRequest(createUserSchema), createUserHandler);

  // Login
  app.post(
    "/api/sessions",
    validateRequest(createUserSessionSchema),
    createUserSessionHandler
  );

  // Get the user's sessions
  app.get("/api/sessions", requiresUser, getUserSessionsHandler);

  // Logout
  app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler);

  // Create a product
  app.post(
    "/api/products",
    [requiresUser, validateRequest(createProductSchema)],
    createProductHandler
  );

  // Update a product
  app.put(
    "/api/products/:productId",
    [requiresUser, validateRequest(updateProductSchema)],
    updateProductHandler
  );

  // Get a product
  app.get(
    "/api/products/:productId",
    validateRequest(readProductSchema),
    getProductHandler
  );

  // Delete a product
  app.delete(
    "/api/products/:productId",
    [requiresUser, validateRequest(deleteProductSchema)],
    deleteProductHandler
  );
}
