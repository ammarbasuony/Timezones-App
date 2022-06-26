import React from "react";

// Components
import Counter from "./Counter";

const Dashboard = () => {
  return (
    <div className="flex gap-4">
      <Counter />
      <Counter />
    </div>
  );
};

export default Dashboard;
