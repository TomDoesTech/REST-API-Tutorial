import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    password: string({
      required_error: "Password is required",
    }).min(6, "Password is too short - should be 6 chars minimum."),
    passwordConfirmation: string({
      required_error: "Email is required",
    }),
    email: string().email("Must be a valid email"),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"], // path of error
  }),
});

export const createUserSessionSchema = object({
  body: object({
    password: string({
      required_error: "Password is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email("Must be a valid email"),
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;

export type CreateUserSessionInput = TypeOf<typeof createUserSessionSchema>;
