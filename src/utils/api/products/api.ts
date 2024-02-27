import axios from 'axios';
import { AddProductType, IProducts } from './type';
import { IResponse } from '../types';

export const getProducts = async () => {
  try {
    const res = await axios.get('http://localhost:8080/api/product');

    return res.data as IResponse<IProducts[]>;
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (productId: string | undefined) => {
  try {
    const res = await axios.get(`http://localhost:8080/api/product/${productId}`);

    return res.data as IResponse<IProducts>;
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (productId: string | undefined, body: AddProductType) => {
  try {
    const res = await axios.put(`http://localhost:8080/api/product/${productId}`, body);
    console.log(res);
    return res.data as IResponse;
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (body: AddProductType) => {
  try {
    const res = await axios.post('http://localhost:8080/api/product/create', body);

    return res.data as IResponse<AddProductType>;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (productId: string | undefined) => {
  try {
    const res = await axios.delete(`http://localhost:8080/api/product/delete/${productId}`);

    return res.data as IResponse;
  } catch (error) {
    console.log(error);
  }
};
