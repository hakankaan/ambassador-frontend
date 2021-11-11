import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Product } from "../../models/products";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("products");

      setProducts(data);
    })();
  }, []);

  const del = async (id: number) => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`products/${id}`);
      setProducts((prev) => prev.filter((product) => product.id != id));
    }
  };
  return (
    <Layout>
      <div className="pt-3 pb-2 mb-3 border-bottom">
        <Button href={"/products/create"} variant="contained" color="primary">
          Add
        </Button>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
            .map((product) => {
              return (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>
                    <img src={product.image} width="50" />
                  </TableCell>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => del(product.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
        <TableFooter>
          <TablePagination
            component="div"
            count={products.length}
            page={page}
            onPageChange={(
              event: MouseEvent<HTMLButtonElement> | null,
              newPage: number
            ) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(
              event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              setRowsPerPage(parseInt(event.target.value, 10));
            }}
            rowsPerPageOptions={[5, 10, 20]}
          />
        </TableFooter>
      </Table>
    </Layout>
  );
};

export default Products;
