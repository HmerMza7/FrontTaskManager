import { useState } from "react";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onNewTask={() => setShowForm(true)} />
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Pendientes
            </h2>
            <div className="flex flex-col gap-3"></div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Completadas
            </h2>
            <div className="flex flex-col gap-3"></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
