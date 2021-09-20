import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/oldComponents/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  getSingleClientFunction,
  updateClientFunction
} from "../../../functions/callsToClientRoutes";
import FileUpload from "../../../components/oldComponents/formComponents/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import ClientUpdateForm from "../../../components/oldComponents/formComponents/clientFormsComponents/ClientUpdateForm";

//Cars DB API: https://parse-dashboard.back4app.com/apps/7e730946-c9c1-4aca-90f3-87f9abc2842c/browser/Carmodels_Car_Model_List
//https://www.back4app.com/docs/react/quickstart

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
  email: "",
  cars: [],
  slug: "",
  _id: ""
};

const ClientUpdatePage = ({ match }) => {
   // states
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  // router
  const { slug } = match.params;
  console.log(match.params);

  const getClientFromDBFunction = () => {
    getSingleClientFunction(slug).then((client) => {
      setValues({ ...values, ...client.data });
    });
  };

  useEffect(() => {
    getClientFromDBFunction();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    updateClientFunction(slug, values, user.token)
        .then((res) => {
          setLoading(false);
          toast.success(`The client with id: ${res.data._id} is updated.`);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          toast.error(err.response.data.err);
        });
  };

  const handleChange = (e) => {
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
                <h4>Client update</h4>
            )}

            {/* {JSON.stringify(values)} */}

            <div className="p-3">
              <FileUpload
                  values={values}
                  setValues={setValues}
                  setLoading={setLoading}
              />
            </div>

            <ClientUpdateForm
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                values={values}
            />
            <hr />
          </div>
        </div>
      </div>
  );
};

export default ClientUpdatePage;
