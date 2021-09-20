import React, { useState } from "react";
import AdminNav from "../../../components/oldComponents/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createClientFunction } from "../../../functions/callsToClientRoutes";
import ClientCreateForm from "../../../components/oldComponents/formComponents/clientFormsComponents/ClientCreateForm";
import FileUpload from "../../../components/oldComponents/formComponents/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";

const initialState = {
      name: "",
      surname: "",
      date: "",
      fiscal_code: 0,
      address: "",
      city: "",
      province: "",
      notes: "",
      mobile: 0,
      email: "@",
      cars: [],
      slug: ""
};

const ClientCreatePage = () => {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);

  // GEt the user from Redux Store
  const { user } = useSelector((state) => ({ ...state }));

  const handleSubmit = (e) => {
    e.preventDefault();
    createClientFunction(values, user.token)
      .then(() => {
        window.alert( "Client added." );
        window.location.reload();
      })
      .catch((err) => {
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    //Dynamically update each of the initialState values by their name parameter.
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>Add new client:</h4>
          )}
          <hr />    

          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          <ClientCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
          />
        </div>
      </div>
    </div>
  );
};

export default ClientCreatePage;
