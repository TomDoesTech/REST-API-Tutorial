import { number, object, string, TypeOf } from "zod";

const payload = {
  body: object({
    title: string(),
    description: string().min(
      120,
      "Description is too short - should be 120 chars minimum."
    ),
    price: number({
      required_error: "Price is a required field",
    }),
    image: string({
      required_error: "Image is a required field",
    }),
  }),
};

const params = {
  params: object({
    productId: string({
      required_error: "productId is required",
    }),
  }),
};

export const createProductSchema = object({
  ...payload,
});

export const readProductSchema = object({
  ...params,
});

export const updateProductSchema = object({
  ...params,
  ...payload,
});

export const deleteProductSchema = object({
  ...params,
});

export type CreateProductInput = TypeOf<typeof createProductSchema>;

export type ReadProductInput = TypeOf<typeof readProductSchema>;

export type UpdateProductInput = TypeOf<typeof updateProductSchema>;

export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;
