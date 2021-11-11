import axios from "axios";
import { Dispatch, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router";
import { User } from "../models/user";
import { setUser } from "../redux/actions/setUserAction";
import Menu from "./Menu";
import Nav from "./Nav";

const Layout = (props: any) => {
  const [ redirect, setRedirect ] = useState(false)

  useEffect(() => {
    (
      async () => {
        try {
          const { data } = await axios.get("user");
  
          props.setUser(data)
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
        <Nav />
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

const mapStateToProps = (state: {user: User}) => ({
  user: state.user
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  setUser: (user: User) => dispatch(setUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
