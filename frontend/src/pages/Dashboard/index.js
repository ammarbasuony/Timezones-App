import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// APIs
import { getCounters } from "../../api/home";

// Actions
import { saveDashboardData } from "../../store/actions";

// Components
import Header from "../../components/Header";
import Counter from "./Counter";
import Loading from "../../components/Loading";

// Icons
import { userIcon, clockIcon } from "../../helpers/icons";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { dashboard } = useSelector((state) => state.dataReducer);

  const fetchData = async () => {
    if (!dashboard?.length) {
      const response = await getCounters();
      setData(response.data);
      dispatch(saveDashboardData(response.data));
    } else {
      setData(dashboard);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Header title="Dashboard" />

      {data?.length ? (
        <div className="lg:flex block gap-4">
          {data.map((item) => (
            <Counter
              key={item.name}
              title={item.name}
              todayCount={item.today}
              totalCount={item.total}
              icon={
                item.name === "Users"
                  ? userIcon("text-blue-500", 20, 20)
                  : clockIcon("text-purple-500", 20, 20)
              }
              iconBg={item.name === "Users" ? "bg-blue-200" : "bg-purple-200"}
            />
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Dashboard;
