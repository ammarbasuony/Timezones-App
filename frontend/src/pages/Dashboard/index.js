import React from "react";

// Components
import Header from "../../components/Header";
import Counter from "./Counter";

// Icons
import { userIcon, clockIcon } from "../../helpers/icons";

const Dashboard = () => {
  return (
    <div>
      <Header title="Dashboard" />

      <div className="lg:flex block gap-4">
        <Counter
          title="Users"
          todayCount={98}
          totalCount={254}
          icon={userIcon("text-blue-500", 20, 20)}
          iconBg="bg-blue-200"
        />
        <Counter
          title="Timezones"
          todayCount={98}
          totalCount={254}
          icon={clockIcon("text-purple-500", 20, 20)}
          iconBg="bg-purple-200"
        />
      </div>
    </div>
  );
};

export default Dashboard;
