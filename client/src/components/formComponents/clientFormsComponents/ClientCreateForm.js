import React from "react";
import { Select } from "antd";
const { Option } = Select;
//Get the multi-choice logic from here.

const ClientCreateForm = ({handleSubmit, handleChange, carInfo, handleCarBrandChange}) => {
      const { brands, model, registrationPlate, revisions, km, year, client, referenceToClient } = carInfo;

  return (
      <>
         <div className="form-group">
            <label>Car brand</label>
            <select name="brand" className="form-control" onChange={handleChange}>
                <option>Please select the car brand:</option>
                {brands.map((brand) => (
                    <option key={brand} value={brand}>
                        {brand}
                    </option>
                ))}
            </select>
        </div>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>model</label>
          <input
            type="text"
            name="model"
            className="form-control"
            value={model}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Registration plate number</label>
          <input
            type="text"
            name="registrationPlate"
            className="form-control"
            value={registrationPlate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Revisions</label>
          <input
            type="number"
            name="revisions"
            className="form-control"
            value={revisions}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>KMf</label>
          <input
              type="number"
              name="km"
              className="form-control"
              value={km}
              onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Revisions</label>
          <input
              type="number"
              name="revisions"
              className="form-control"
              value={revisions}
              onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Year</label>
          <input
            type="number"
            name="year"
            className="form-control"
            value={year}
            onChange={handleChange}
          />
        </div>
        {/*TODO figure out how to ge the client unique id.*/}
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
        <br />
        <button className="btn btn-outline-info">Save</button>
      </form>
      </>
  );
};

export default ClientCreateForm;
