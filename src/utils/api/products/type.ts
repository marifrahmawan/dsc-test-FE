import * as z from 'zod';

export interface IProducts {
  _id: string;
  productType: string;
  productBrand: string;
  stock: string;
  price: string;
  information: string;
}

export const addProductSchema = z.object({
  productBrand: z.string().min(2).max(50),
  productType: z.string().min(2).max(50),
  stock: z.string().min(1),
  price: z.string().min(1),
  information: z.string().min(1),
});

export type AddProductType = z.infer<typeof addProductSchema>;
