import Menu from "./Menu";
import Nav from "./Nav";

const Layout = (props: any) => {
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

export default Layout;
