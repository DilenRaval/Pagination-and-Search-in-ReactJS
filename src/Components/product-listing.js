import React, { useEffect, useState } from "react";
import "../../src/App.css";

const Productlisting = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const fetchProducts = async () => {
    const res = await fetch(`https://dummyjson.com/products?limit=100`);
    const data = await res.json();
    console.log(data);

    if (data && data.products) {
      setProducts(data.products);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const selectedPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  return (
    <div className="product_listing_wrapper">
      {products.length > 0 && (
        <div className="products">
          {/*  (2 * 10 - 10) = 10  ==> 11 to 20 */}
          {products.slice(page * 10 - 10, page * 10).map((product) => {
            return (
              <div key={product.id} className="products_item">
                <div className="products__title">
                  <h3>{product.title}</h3>
                </div>
                <div className="products__image">
                  <img src={product.thumbnail} alt={product.title} />
                </div>
                <div className="products__description">
                  <p>{product.description}</p>
                </div>
                <div className="products__price_ratings">
                  <p>${product.price}</p>
                  <p>{product.rating}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span
            onClick={() => selectedPageHandler(page - 1)}
            className={page > 1 ? "" : "hide_left_arrow"}
          >
            ◀
          </span>
          {[...Array(products.length / 10)].map((_, i) => {
            return (
              <span
                className={page === i + 1 ? "selected-page" : ""}
                key={i}
                onClick={() => selectedPageHandler(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            onClick={() => selectedPageHandler(page + 1)}
            className={page < products.length / 10 ? "" : "hide_right_arrow"}
          >
            ▶
          </span>
        </div>
      )}
    </div>
  );
};

export default Productlisting;
