import { Product } from "../types";

export const getProducts = async (): Promise<{ products: Product[] }> => {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();

  return data;
};
