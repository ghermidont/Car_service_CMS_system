import React, {useEffect, useState} from "react";

//TODO implement the cascader.
/*Use the the Ant cascader for cars select.
https://ant.design/components/cascader/*/

//Cars DB API: https://parse-dashboard.back4app.com/apps/7e730946-c9c1-4aca-90f3-87f9abc2842c/browser/Carmodels_Car_Model_List
//https://www.back4app.com/docs/react/quickstart

//The params are sent from the ClientUpdatePage.js component.
const ServiceUpdateForm = ({handleSubmit, handleChange, values}) => {

  const {
    brand,
    model,
    registrationPlate,
    revisions,
    km,
    year,
    client
  } = values;

  const clientsFromDb = [
    {"id": "2323423", "name": "gsdsdf"},
    {"id": "2323423", "name": "fwewegsdsdf"},
    {"id": "2323423", "name": "gsdsdsdsdf"}
  ];

  return (
      <>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Brand</label>
            <input
                type="text"
                name="brand"
                className="form-control"
                value={brand}
                onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Model</label>
            <input
                type="text"
                name="model"
                className="form-control"
                value={model}
                onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Registration plate</label>
            <input
                type="date"
                name="registrationPlate"
                className="form-control"
                value={registrationPlate}
                onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Revisions</label>
            <input
                type="text"
                name="revisions"
                className="form-control"
                value={revisions}
                onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>KM</label>
            <input
                type="text"
                name="km"
                className="form-control"
                value={km}
                onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Year</label>
            <input
                type="text"
                name="year"
                className="form-control"
                value={year}
                onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Client</label>
            <input
                type="text"
                name="client"
                className="form-control"
                value={client}
                onChange={handleChange}
            />
          </div>

          {/*// TODO Implement the clients selector.*/}
          <div className="form-group">
            <label>Cars</label>
            <select name="brand" className="form-control" onChange={handleChange}>
              <option>Please select the client:</option>
              {clientsFromDb.map((cli, i) => (
                  <option
                      key={cli}
                      value={cli}
                  >
                    {cli._id}
                  </option>
              ))}
            </select>
          </div>
          <br />
          <button className="btn btn-outline-info">Save</button>
        </form>
      </>
  );
};

export default ServiceUpdateForm;
