import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { User } from "../models/user";
import Menu from "./Menu";
import Nav from "./Nav";

const Layout = (props: any) => {
  const [ redirect, setRedirect ] = useState(false)
  const [ user, setUser ] = useState<User | null>(null)

  useEffect(() => {
    (
      async () => {
        try {
          const { data } = await axios.get("user");
  
          setUser(data);
        } catch (error) {
          setRedirect(true)
        }
      }
    )()
  }, [])

  if (redirect) return <Navigate to="/login" />

  return (
    <div>
      <div>
        <Nav {...{user}} />
        <div className="container-fluid">
          <div className="row">
            <Menu />
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              <div className="table-responsive">
                  {props.children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
