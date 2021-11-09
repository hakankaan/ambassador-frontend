import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { User } from "../models/user";

const Nav = (props: {user: User | null}) => {
  return (
    <>
      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">
          Company Name
        </a>

        <div className="navbar-nav">
          <div className="nav-item text-nowrap">
            <Link to="/profile" className="px-3" >{props.user?.first_name} {props.user?.last_name}</Link>
            <Link to="/login" className="px-3" onClick={async () => await axios.post('logout')}>
              Sign out
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Nav;
