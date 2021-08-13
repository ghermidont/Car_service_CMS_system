import React, {useState} from "react";
import Parse from 'parse/dist/parse.min.js';
// import { Select } from "antd";
// import {onLog} from "firebase";
//!start here!!! Find length in the source in chrome error.
/*Use the the Ant cascader for cars select.
https://ant.design/components/cascader/*/

//const { Option } = Select;
//{ handleSubmit, handleChange, setValues, values }
const CarUpdateForm = () => {
  // const {
  //   brand,
  //   model,
  //   registrationPlate,
  //   revisions,
  //   km,
  //   year,
  //   client
  // } = values;

  const [person, setPerson] = useState(null);

  async function addPerson() {
    try {
      // create a new Parse Object instance
      const Person = new Parse.Object('Person');
      // define the attributes you want for your Object
      Person.set('name', 'John');
      Person.set('email', 'john@back4app.com');
      // save it on Back4App Data Store
      await Person.save();
      alert('Person saved!');
    } catch (error) {
      console.log('Error saving new person: ', error);
    }
  }

  async function fetchPerson() {
    // create your Parse Query using the Person Class you've created
    const query = new Parse.Query('Person');
    // use the equalTo filter to look for user which the name is John. this filter can be used in any data type
    query.equalTo('name', 'John');
    // run the query
    const Person = await query.first();
    // access the Parse Object attributes
   // console.log('person name: ', Person.get('name'));
   // console.log('person email: ', Person.get('email'));
   // console.log('person id: ', Person.id);
    setPerson(Person);
  }

  return (
      <div>
        <button onClick={()=>addPerson()}>Add Person</button>
        <button onClick={()=>fetchPerson()}>Fetch Person</button>
        {person !== null && (
            <div>
              <p>{`Name: ${person.get('name')}`}</p>
              <p>{`Email: ${person.get('email')}`}</p>
            </div>
        )}
      </div>

    // <form onSubmit={handleSubmit}>
    //   <div className="form-group">
    //     <label>Brand</label>
    //     <input
    //       type="text"
    //       name="brand"
    //       className="form-control"
    //       value={brand}
    //       onChange={handleChange}
    //     />
    //   </div>
    //
    //   <div className="form-group">
    //     <label>Model</label>
    //     <input
    //       type="text"
    //       name="model"
    //       className="form-control"
    //       value={model}
    //       onChange={handleChange}
    //     />
    //   </div>
    //
    //   <div className="form-group">
    //     <label>License plate</label>
    //     <input
    //       type="text"
    //       name="price"
    //       className="form-control"
    //       value={price}
    //       onChange={handleChange}
    //     />
    //   </div>
    //
    //   <div className="form-group">
    //     <label>Shipping</label>
    //     <select
    //       value={shipping === "Yes" ? "Yes" : "No"}
    //       name="shipping"
    //       className="form-control"
    //       onChange={handleChange}
    //     >
    //       <option value="No">No</option>
    //       <option value="Yes">Yes</option>
    //     </select>
    //   </div>
    //
    //   <div className="form-group">
    //     <label>Quantity</label>
    //     <input
    //       type="number"
    //       name="quantity"
    //       className="form-control"
    //       value={quantity}
    //       onChange={handleChange}
    //     />
    //   </div>
    //
    //   <div className="form-group">
    //     <label>Color</label>
    //     <select
    //       value={color}
    //       name="color"
    //       className="form-control"
    //       onChange={handleChange}
    //     >
    //       {colors.map((c) => (
    //         <option key={c} value={c}>
    //           {c}
    //         </option>
    //       ))}
    //     </select>
    //   </div>
    //
    //   <div className="form-group">
    //     <label>Brand</label>
    //     <select
    //       value={brand}
    //       name="brand"
    //       className="form-control"
    //       onChange={handleChange}
    //     >
    //       {brands.map((b) => (
    //         <option key={b} value={b}>
    //           {b}
    //         </option>
    //       ))}
    //     </select>
    //   </div>
    //
    //   <div className="form-group">
    //     <label>Category</label>
    //     <select
    //       name="category"
    //       className="form-control"
    //       onChange={handleCategoryChange}
    //       value={selectedCategory ? selectedCategory : category._id}
    //     >
    //       {categories.length > 0 &&
    //         categories.map((c) => (
    //           <option key={c._id} value={c._id}>
    //             {c.name}
    //           </option>
    //         ))}
    //     </select>
    //   </div>
    //
    //   <div>
    //     <label>Sub Categories</label>
    //     <Select
    //       mode="multiple"
    //       style={{ width: "100%" }}
    //       placeholder="Please select"
    //       value={arrayOfSubs}
    //       onChange={(value) => setArrayOfSubs(value)}
    //     >
    //       {subOptions.length &&
    //         subOptions.map((s) => (
    //           <Option key={s._id} value={s._id}>
    //             {s.name}
    //           </Option>
    //         ))}
    //     </Select>
    //   </div>
    //
    //   <br />
    //   <button className="btn btn-outline-info">Save changes</button>
    // </form>

  )
};

export default CarUpdateForm;

//##########################################

// import { Cascader } from 'antd';
//
// const options = [
//   {
//     value: 'zhejiang',
//     label: 'Zhejiang',
//     children: [
//       {
//         value: 'hangzhou',
//         label: 'Hangzhou',
//         children: [
//           {
//             value: 'xihu',
//             label: 'West Lake',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     value: 'jiangsu',
//     label: 'Jiangsu',
//     children: [
//       {
//         value: 'nanjing',
//         label: 'Nanjing',
//         children: [
//           {
//             value: 'zhonghuamen',
//             label: 'Zhong Hua Men',
//           },
//         ],
//       },
//     ],
//   },
// ];
//
// function onChange(value) {
//   console.log(value);
// }
//
// ReactDOM.render(
//     <Cascader options={options} onChange={onChange} placeholder="Please select" />,
//     mountNode,
// );