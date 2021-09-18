import React from "react";
import AdminNav from "../../components/oldComponents/nav/AdminNav";
import AdminDashUsersList from "./AdminDashUsersList";

const AdminDashboardPage = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
         <h4>CMS Users List:</h4>
         <AdminDashUsersList />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
