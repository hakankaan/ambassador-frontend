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
import Layout from "../components/Layout";
import { User } from "../models/user";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5)

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("ambassadors");
      setUsers(data);
    })();
  }, []);

  return (
    <Layout>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((user) => {
            return (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  {user.first_name}{" "}
                  {user.last_name}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TablePagination
            component="div"
            count={users.length}
            page={page}
            onPageChange={(
              event: MouseEvent<HTMLButtonElement> | null,
              newPage: number
            ) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
              setRowsPerPage(parseInt(event.target.value, 10))
            }}
            rowsPerPageOptions={[5, 10, 20]}
          />
        </TableFooter>
      </Table>
    </Layout>
  );
};

export default Users;
