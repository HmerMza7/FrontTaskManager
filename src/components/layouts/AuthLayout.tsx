import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div>
      <h3>Layout</h3>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
