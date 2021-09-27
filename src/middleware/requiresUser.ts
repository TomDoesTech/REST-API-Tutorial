import { Request, Response, NextFunction } from "express";

const requiresUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;

  if (!user) {
    return res.sendStatus(403);
  }

  return next();
};

export default requiresUser;
