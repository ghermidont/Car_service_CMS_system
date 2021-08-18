import React, {useState} from "react";
//import { Select } from "antd";
//import {onLog} from "firebase";

//const { Option } = Select;

/*Use the the Ant cascader for cars select.
https://ant.design/components/cascader/*/

//Cars DB API: https://parse-dashboard.back4app.com/apps/7e730946-c9c1-4aca-90f3-87f9abc2842c/browser/Carmodels_Car_Model_List
//https://www.back4app.com/docs/react/quickstart

//The params are sent from the ClientUpdatePage.js component.
const ClientUpdateForm = ({values, setValues, handleSubmit, handleChange}) => {

  const[dateOfBirth, setDateOfBirth] = useState();

  const {
    name,
    surname,
    date,
    fiscalCode,
    address,
    city,
    province,
    notes,
    mobile,
    email,
    cars,
    // ??? See the slug logic
    // ??? See the id logic
  } = values;

  //Call this function in the useEffect hook to format the date.
  function formattedDate(rawDate){
    let formattedDate;
    if(rawDate===undefined){
      setDateOfBirth("Date of birth not set");
    }else{
      let now = new Date(rawDate);
      formattedDate =  date.format(now, "ddd, MMM DD YYYY");
    }
    return setDateOfBirth(formattedDate);
  }

  return (
      <>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
                type="text"
                name="name"
                className="form-control"
                value={name}
                onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Surname</label>
            <input
                type="text"
                name="surname"
                className="form-control"
                value={surname}
                onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Surname</label>
            <input
                type="date"
                name="date"
                className="form-control"
                value={dateOfBirth}
                onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Fiscal code</label>
            <input
                type="text"
                name="fiscalCode"
                className="form-control"
                value={fiscalCode}
                onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
                type="text"
                name="address"
                className="form-control"
                value={address}
                onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>City</label>
            <input
                type="text"
                name="city"
                className="form-control"
                value={city}
                onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Province</label>
            <input
                type="text"
                name="province"
                className="form-control"
                value={province}
                onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea
                value={notes}
                name="notes"
                rows="4"
                maxLength="1000"
                onChange={handleChange}
            >
				</textarea>
          </div>

          <div className="form-group">
            <label>Phone number</label>
            <input
                type="tel"
                name="mobile"
                className="form-control"
                value={mobile}
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                onChange={handleChange}
            />
            {/*modify the pattern*/}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
                type="email"
                name="email"
                className="form-control"
                value={email}
                onChange={handleChange}
            />
          </div>

          {/*//Cars selector. Implement the API here*/}
          <div className="form-group">
            <label>Cars</label>
            <select name="brand" className="form-control" onChange={handleChange}>
              <option>Please select the car brand:</option>
              {cars.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
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

export default ClientUpdateForm;
