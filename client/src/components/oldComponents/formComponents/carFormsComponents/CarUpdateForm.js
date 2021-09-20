import React from "react";

/*Use the the Ant cascader for cars select.
https://ant.design/components/cascader/*/

//Cars DB API: https://parse-dashboard.back4app.com/apps/7e730946-c9c1-4aca-90f3-87f9abc2842c/browser/Carmodels_Car_Model_List
//https://www.back4app.com/docs/react/quickstart

//const { Option } = Select;
//{ handleSubmit, handleChange, setValues, values }
const CarUpdateForm = ({handleChange, handleSubmit, values}) => {
console.log("values", values);

    // const {
    //   brand,
    //   model,
    //   registrationPlate,
    //   revisions,
    //   km,
    //   year,
    //   client
    // } = values;


  // TODO Change this with the info from the back4app API
  // const brands = ["brand1", "brand2", "brand3"];

  return (
      <div>Update form</div>
      // <>
      //   <div className="form-group">
      //     <label>Car brand</label>
      //     <select
      //         name="brand"
      //         className="form-control"
      //         onChange={handleChange}
      //     >
      //       <option>Please select the car brand:</option>
      //       {brands.map((br, i) => (
      //           br===values.brand?
      //           <option key={br+i} value={br} selected>
      //             {br}
      //           </option>:
      //           <option key={br+i} value={br}>
      //             {br}
      //           </option>
      //       ))}
      //     </select>
      //   </div>
      //   <form onSubmit={handleSubmit}>
      //     <div className="form-group">
      //       <label>model</label>
      //       <input
      //           type="text"
      //           name="model"
      //           className="form-control"
      //           value={values.model}
      //           onChange={handleChange}
      //       />
      //     </div>
      //
      //     <div className="form-group">
      //       <label>Registration plate number</label>
      //       <input
      //           type="text"
      //           name="registrationPlate"
      //           className="form-control"
      //           value={values.registrationPlate}
      //           onChange={handleChange}
      //       />
      //     </div>
      //
      //     <div className="form-group">
      //       <label>Revisions</label>
      //       <input
      //           type="number"
      //           name="revisions"
      //           className="form-control"
      //           value={values.revisions}
      //           onChange={handleChange}
      //       />
      //     </div>
      //
      //     <div className="form-group">
      //       <label>KM</label>
      //       <input
      //           type="number"
      //           name="km"
      //           className="form-control"
      //           value={values.km}
      //           onChange={handleChange}
      //       />
      //     </div>
      //
      //     <div className="form-group">
      //       <label>Revisions</label>
      //       <input
      //           type="number"
      //           name="revisions"
      //           className="form-control"
      //           value={values.revisions}
      //           onChange={handleChange}
      //       />
      //     </div>
      //
      //     <div className="form-group">
      //       <label>Year</label>
      //       <input
      //           type="number"
      //           name="year"
      //           className="form-control"
      //           value={values.year}
      //           onChange={handleChange}
      //       />
      //     </div>
      //     {/*TODO figure out how to ge the client unique id.*/}
      //     <div className="form-group">
      //       <label>Client</label>
      //       <input
      //           type="text"
      //           name="client"
      //           className="form-control"
      //           value={values.client}
      //           onChange={handleChange}
      //       />
      //     </div>
      //     <br/>
      //     <button className="btn btn-outline-info">Save</button>
      //   </form>
      // </>
  );
}

export default CarUpdateForm;