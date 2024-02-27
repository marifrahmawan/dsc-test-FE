import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import NavBar from '@/components/navbar';
import { Textarea } from '@/components/ui/textarea';
import { AddProductType, IProducts, addProductSchema } from '@/utils/api/products/type';
import { getProductById, updateProduct } from '@/utils/api/products/api';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const EditProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState<IProducts | undefined>();

  const form = useForm<AddProductType>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      productBrand: '',
      productType: '',
      stock: '',
      price: '',
      information: '',
    },
  });

  const submitProduct = async (values: AddProductType) => {
    try {
      const res = await updateProduct(product?._id, values);

      console.log(res?.message);

      // setTimeout(() => {
      //   navigate('/');
      // }, 400);
      // form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const res = await getProductById(productId);

      setProduct(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    form.setValue('productBrand', product?.productBrand);
    form.setValue('productType', product?.productType);
    form.setValue('price', product?.price);
    form.setValue('stock', product?.stock);
    form.setValue('information', product?.information);
  }, [product]);

  return (
    <>
      <NavBar />
      <div className="container pt-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitProduct)} className="space-y-8">
            <FormField
              control={form.control}
              name="productBrand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Input placeholder="Product Brand" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="productType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Product Type" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input placeholder="Product Stock" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Product Price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="information"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Information</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Product Information" {...field} className="h-[150px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default EditProduct;
