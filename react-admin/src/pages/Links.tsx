import {
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
import { useParams } from "react-router";
import Layout from "../components/Layout";
import { Link } from "../models/link";

const Links = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const {id} = useParams()

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`users/${id}/links`);
      setLinks(data);
    })();
  }, []);

  return (
    <Layout>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Code</TableCell>
            <TableCell>Count</TableCell>
            <TableCell>Revenue</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {links
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
            .map((link) => {
              return (
                <TableRow key={link.id}>
                  <TableCell>{link.id}</TableCell>
                  <TableCell>{link.code}</TableCell>
                  <TableCell>{link.orders.length}</TableCell>
                  <TableCell>{link.orders.reduce((sum, order) => sum + order.total, 0)}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
        <TableFooter>
          <TablePagination
            component="div"
            count={links.length}
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

export default Links;
