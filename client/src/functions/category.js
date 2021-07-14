/** This are the requests to our backend for manipulating the categories. */

import axios from "axios";

export const getCategories = async () => { await axios.get(`${process.env.REACT_APP_API}/categories`); };

export const getCategory = async (slug) => { await axios.get(`${process.env.REACT_APP_API}/category/${slug}`); };

//include the tokens since it is a protected route.
export const removeCategory = async (slug, authToken) => { await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, { headers: { authToken }});};

//include the tokens since it is a protected route.
export const updateCategory = async (slug, category, authToken) => { await axios.put(`${process.env.REACT_APP_API}/category/${slug}`, category, { headers: {authToken}});};

//include the tokens since it is a protected route.
export const createCategory = async (category, authToken) => { await axios.post(`${process.env.REACT_APP_API}/category`, category, { headers: { authToken } }); };

export const getCategorySubs = async (_id) => { await axios.get(`${process.env.REACT_APP_API}/category/subs/${_id}`); };
