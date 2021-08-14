import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getSingleClientFunction, updateClientFunction } from "../../../functions/callsToClientRoutes";
import FileUpload from "../../../components/formComponents/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import ClientUpdateForm from "../../../components/formComponents/clientFormsComponents/ClientUpdateForm";

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
                setValues={setValues}
                values={values}
            />
            <hr />
          </div>
        </div>
      </div>
  );
};

export default ClientUpdatePage;
