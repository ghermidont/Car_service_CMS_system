import React from "react";

//TODO implement the cascader.
/*Use the the Ant cascader for cars select.
https://ant.design/components/cascader/*/

//Cars DB API: https://parse-dashboard.back4app.com/apps/7e730946-c9c1-4aca-90f3-87f9abc2842c/browser/Carmodels_Car_Model_List
//https://www.back4app.com/docs/react/quickstart

const CarCreateForm = ({handleSubmit, handleChange, values}) => {

      const { brands, model, registrationPlate, revisions, km, year, client } = values;

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
              type="number"
              name="km"
              className="form-control"
              value={km}
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

export default CarCreateForm;