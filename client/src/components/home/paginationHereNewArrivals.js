import React, { useEffect, useState } from "react";
import { getProducts, getProductsCount } from "../../functions/car";
import ProductCard from "../cards/ProductCard";
import LoadingCard from "../cards/LoadingCard";
import { Pagination } from "antd";

const PaginationHereNewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  const loadAllProducts = () => {
    setLoading(true);
    // sort, order, limit
    getProducts("createdAt", "desc", page).then((res) => {
      res&&setProducts(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadAllProducts();
  }, [page, loadAllProducts]);

  useEffect(() => {
    getProductsCount().then((res) => res&&setProductsCount(res.data));
  }, []);

  return (
    <>
      <div className="container">
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="row">
        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
          <Pagination
            current={page}
            // This is the car total we get from the backend.
            total={(productsCount / 3) * 10}
            //The value here represent the the page number the user chooses.
            onChange={(value) => setPage(value)}
          />
        </nav>
      </div>
    </>
  );
};

export default PaginationHereNewArrivals;
