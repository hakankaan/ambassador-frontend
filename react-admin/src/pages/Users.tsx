import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { User } from "../models/user";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("ambassadors");
      setUsers(data);
    })();
  }, []);
  return (
    <Layout>
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Header</th>
            <th scope="col">Header</th>
            <th scope="col">Header</th>
            <th scope="col">Header</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  {user.first_name} {user.last_name}
                </td>
                <td>{user.email}</td>
                <td>placeholder</td>
                <td>text</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Layout>
  );
};

export default Users;
