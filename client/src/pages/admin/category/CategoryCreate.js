import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
//Handles the pop up messages.
import { toast } from "react-toastify";
//Access the Redux Store.
import { useSelector } from "react-redux";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const CategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  // search step 1. This is the user's search query.
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => getCategories().then((c) => setCategories(c.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {      
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
        //After we create our categories, we reload our categories so out UI is updated.
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    //window.confirm method returns true or false. Double check with the user if the item should be deleted.
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadCategories();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  // search step 4. Check is the category name includes the key word.
  const searched = (keyWord) => (category) => category.name.toLowerCase().includes(keyWord);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4>Create category</h4>
          )}

          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />

          {/* search step 2 and step 3 */}
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          {/* search step 5. Map the correspondingg category */}
          {categories.filter(searched(keyword)).map((category) => (
            <div className="alert alert-secondary" key={category._id}>
              {category.name}
              <span
                onClick={() => handleRemove(category.slug)}
                className="btn btn-sm float-right"
              >
                <DeleteOutlined className="text-danger" />
              </span>
              <Link to={`/admin/category/${category.slug}`}>
                <span className="btn btn-sm float-right">
                  <EditOutlined className="text-warning" />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
