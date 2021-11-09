import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import Layout from "../components/Layout";

const Users = () => {
  const [ redirect, setRedirect ] = useState(false)

  useEffect(() => {
    (
      async () => {
        try {
          const { data } = await axios.get("user");
  
          console.log(data);
        } catch (error) {
          setRedirect(true)
        }
      }
    )()
  }, [])

  if (redirect) return <Navigate to="/login" />

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
          <tr>
            <td>1,001</td>
            <td>random</td>
            <td>data</td>
            <td>placeholder</td>
            <td>text</td>
          </tr>
        </tbody>
      </table>
    </Layout>
  );
};

export default Users;
