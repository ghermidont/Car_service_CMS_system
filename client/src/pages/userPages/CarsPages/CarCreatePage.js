import React, { useState } from "react";
import AdminNav from "../../../components/oldComponents/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createCarFunction } from "../../../functions/callsToCarRoutes";
import CarCreateForm from "../../../components/oldComponents/formComponents/carFormsComponents/CarCreateForm";
import FileUpload from "../../../components/oldComponents/formComponents/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";

//Cars DB API: https://parse-dashboard.back4app.com/apps/7e730946-c9c1-4aca-90f3-87f9abc2842c/browser/Carmodels_Car_Model_List
//https://www.back4app.com/docs/react/quickstart

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

const CarCreatePage = () => {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);

  // GEt the user from Redux Store
  const { user } = useSelector((state) => ({ ...state }));

  const handleSubmit = (e) => {
    e.preventDefault();
    createCarFunction(values, user.token)
      .then(() => {
        window.alert( "Car added is created" );
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
      <main>
        <div className="container mx-auto py-20">
          <form>
            <label className='block mb-8 text-xl max-w-600'>
              MARCA
              <input type="text"
                     className='block container px-2 py-1 border outline-none rounded border-border mt-1.5'/>
            </label>
            <label className='block mb-8 text-xl max-w-600'>
              MODELLO
              <input type="password"
                     className='block container px-2 py-1 border outline-none rounded border-border mt-1.5'/>
            </label>
            <label className='block mb-8 text-xl max-w-600'>
              TARGA
              <input type="password"
                     className='block container px-2 py-1 border outline-none rounded border-border mt-1.5'/>
            </label>
            <label className='block mb-8 text-xl max-w-600'>
              REVISIONE
              <input type="password"
                     className='block container px-2 py-1 border outline-none rounded border-border mt-1.5'/>
            </label>
            <label className='block mb-8 text-xl max-w-600'>
              KM
              <input type="password"
                     className='block container px-2 py-1 border outline-none rounded border-border mt-1.5'/>
            </label>
            <label className='block mb-8 text-xl max-w-600'>
              ANNO
              <input type="password"
                     className='block container px-2 py-1 border outline-none rounded border-border mt-1.5'/>
            </label>
            <label className='block mb-8 text-xl max-w-600'>
              CLIENTE
              <input type="password"
                     className='block container px-2 py-1 border outline-none rounded border-border mt-1.5'/>
            </label>
            <div className='flex justify-end'>
              {/*Buttons*/}
              <button
                  className='flex items-center text-xl text-white bg-green uppercase py-1 px-4 mr-4 rounded transition hover:opacity-70 focus:opacity-70'>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"> </path>
                </svg>
                Salva
              </button>

              <button
                  className='flex items-center text-xl text-white  bg-blueDark uppercase py-1 px-4 mr-4 rounded transition hover:opacity-70 focus:opacity-70'>
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"> </path>
                </svg>
                Stampa
              </button>

              <button
                  className='flex items-center text-xl text-white bg-blue uppercase py-1 px-4 mr-4 rounded transition hover:opacity-70 focus:opacity-70'>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"> </path>
                </svg>
                Download
              </button>

            </div>
          </form>
        </div>
      </main>

    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>Add new vehicle:</h4>
          )}
          <hr />    

          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          <CarCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
          />
        </div>
      </div>
    </div>
  );
};

export default CarCreatePage;
