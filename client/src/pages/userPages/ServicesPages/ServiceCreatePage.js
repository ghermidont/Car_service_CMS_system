import React, { useState } from "react";
import AdminNav from "../../../components/oldComponents/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createServiceFunction } from "../../../functions/callsToServicesRoute";
import ServiceCreateForm from "../../../components/formComponents/carFormsComponents/CarCreateForm";
import FileUpload from "../../../components/formComponents/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";

const initialState = {
  brand: [],
  model: "Car model",
  registrationPlate: "999999",
  revisions: [],
  km: "",
  year: [],
  client: "client name",
  referenceToClient: "client id"
};

const CarCreate = () => {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);

  // GEt the user from Redux Store
  const { user } = useSelector((state) => ({ ...state }));

  const handleSubmit = (e) => {
    e.preventDefault();
    createServiceFunction(values, user.token)
      .then(() => {
        window.alert( "Service added is created" );
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
            <h4>Add new service:</h4>
          )}
          <hr />    

          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          <ServiceCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
          />
        </div>
      </div>
    </div>
  );
};

export default CarCreate;
