import { Link, Outlet } from "react-router-dom";
import { useSelector } from "../../hooks/useRedux";
import "./Layout.css";

export default function Layout() {
  const user = useSelector((state) => state.common.user);

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
          {user ? (
            <Link className="layout__link" to="/protected">
              {user.username}
            </Link>
          ) : (
            <Link className="layout__link" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
}
