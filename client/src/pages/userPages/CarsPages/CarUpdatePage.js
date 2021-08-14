import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getSingleCarFunction, updateCarFunction } from "../../../functions/callsToCarRoutes";
import FileUpload from "../../../components/formComponents/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import CarUpdateForm from "../../../components/formComponents/carFormsComponents/CarUpdateForm";

const initialState = {
  brand: "",
  model: "",
  licensePlate: "",
  revisions: "",
  km: 0,
  year: 0,
  client: "",
  slug: "",
  _id: 0
  //Use .toString() method to convert _id ObjectId output to string.
};

const CarUpdatePage = ({ match, history }) => {
  // states
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  const { slug } = match.params;

  const getCarsFromDBFunction = () => {
    getSingleCarFunction(slug).then((car) => {
      setValues({ ...values, ...car.data });
    });
  };

  useEffect(() => {
    getCarsFromDBFunction();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
      updateCarFunction(slug, values, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`The car "${res.data.licensePlate}" has been updated.`);
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
            <h4>Car update</h4>
          )}

          {/* {JSON.stringify(values)} */}

          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          <CarUpdateForm
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

export default CarUpdatePage;
