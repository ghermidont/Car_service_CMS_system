import React from "react";
import AdminNav from "../../components/nav/AdminNav";
import CMSUserList from "./CMSUsersPages/CMSUsersList";

const AdminDashboardPage = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h4>CMS Users</h4>
         <CMSUserList />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
