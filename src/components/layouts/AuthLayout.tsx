import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-sm p-8">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">TaskManager</h1>
          <p className="text-sm text-gray-500">
            Gestiona tus tareas fácilmente
          </p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
