import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";
import Product, { ProductDocument } from "../model/product.model";

export function createProduct(
  input: DocumentDefinition<Omit<ProductDocument, "createdAt" | "updatedAt">>
) {
  return Product.create(input);
}

export function findProduct(
  query: FilterQuery<ProductDocument>,
  options: QueryOptions = { lean: true }
) {
  return Product.findOne(query, {}, options);
}

export function findAndUpdateProduct(
  query: FilterQuery<ProductDocument>,
  update: UpdateQuery<ProductDocument>,
  options: QueryOptions
) {
  return Product.findOneAndUpdate(query, update, options);
}

export function deleteProduct(query: FilterQuery<ProductDocument>) {
  return Product.deleteOne(query);
}
