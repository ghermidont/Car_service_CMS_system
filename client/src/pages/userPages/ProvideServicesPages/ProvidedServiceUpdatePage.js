import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getSingleServiceFunction, updateServiceFunction } from "../../../functions/callsToProvidedServicesRoute";
import FileUpload from "../../../components/formComponents/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import ServiceUpdateForm from "../../../components/formComponents/clientFormsComponents/ClientUpdateForm";

const initialState = {
      slug: "",
      data: "",
      license_plate: "",
      brand: "",
      model: "",
      state: "",
      operator: "",
      anomalies: "",
      checks: "",
      actions: "",
      note: "",
      damage: "",
      _id: 0
};

const ProvidedServiceUpdatePage = ({ match }) => {
  // states
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  // router
  const { slug } = match.params;

  const getServiceFromDBFunction = () => {
    getSingleServiceFunction(slug).then((service) => {
      setValues({ ...values, ...service.data });
    });
  };

  useEffect(() => {
    //Call the function on the component mount.
    getServiceFromDBFunction ();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    updateServiceFunction(slug, values, user.token)
        .then((res) => {
          setLoading(false);
          toast.success(`The service with id: ${res.data._id} was updated.`);
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
                <h4>Service updated</h4>
            )}

            {/* {JSON.stringify(values)} */}

            <div className="p-3">
              <FileUpload
                  values={values}
                  setValues={setValues}
                  setLoading={setLoading}
              />
            </div>

            <ServiceUpdateForm
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

export default ProvidedServiceUpdatePage;
