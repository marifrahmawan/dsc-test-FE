import NavBar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { deleteProduct, getProducts } from '@/utils/api/products/api';
import { IProducts } from '@/utils/api/products/type';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
  const [products, setProducts] = useState<IProducts[] | undefined>([]);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();

      setProducts(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async (productId: string) => {
    try {
      await deleteProduct(productId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <NavBar />
      <div className="container pt-7 flex flex-col">
        <div className="flex justify-between mb-5">
          <p>Product List</p>
          <Link to={'/create'}>
            <Button>Create</Button>
          </Link>
        </div>
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Product Brand</TableHead>
              <TableHead>Product Type</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Info</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product._id}</TableCell>
                <TableCell>{product.productBrand}</TableCell>
                <TableCell>{product.productType}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.information}</TableCell>
                <TableCell>
                  <Link to={`/edit/${product._id}`}>
                    <Button className="mr-3">Edit</Button>
                  </Link>
                  <Button className="bg-red-700" onClick={() => deleteHandler(product._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default MainPage;
