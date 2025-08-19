import { Link, Outlet } from "react-router-dom";
import "./Layout.css";

export default function Layout() {
  console.log("Layout 렌더링!");

  return (
    <div className="layout__container">
      <div className="layout__gnb">
        <h1 className="layout__title">Todo App</h1>
        <div>
          <Link className="layout__link" to="/">
            Home
          </Link>
          <Link className="layout__link" to="/about">
            About
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
