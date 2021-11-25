import axios from "axios";

export const mongoDBCreateTestFunction = async (info) => {
    console.log("mongoDBCreateTestFunction()");
    return await axios.post(`${process.env.REACT_APP_API}/test/create`, info);
};