import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import AddUserData from "../components/Dashboard/AddUserData";
import DisplayUserData from "../components/Dashboard/DisplayUserData";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEYS } from "../constants/localStorageKeys";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { getItem, removeItem } = useLocalStorage(
    LOCAL_STORAGE_KEYS.LOGGEDIN_USER
  );
  const username = getItem();

  const userContext = useContext(UserContext);

  const handleLogout = () => {
    removeItem();
    userContext?.clearUsers();
    navigate("/login");
  };

  return (
    <div className="dashboard-main">
      <div className="dashboard-title">
        {username}
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="dashboard-body">
        <AddUserData />
        <DisplayUserData />
      </div>
    </div>
  );
};

export default Dashboard;
