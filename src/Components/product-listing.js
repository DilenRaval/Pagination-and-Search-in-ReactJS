import React, { useEffect, useState } from "react";
import "../../src/App.css";

const Productlisting = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [searchItem, setSearchItem] = useState("");

  const fetchProducts = async () => {
    const res = await fetch(`https://dummyjson.com/products?limit=100`);
    const data = await res.json();

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
      selectedPage <= Math.ceil(products.length / 10) &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
    setPage(1);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchItem.toLowerCase())
  );

  return (
    <div className="product_listing_wrapper">
      <div className="product_search">
        <form>
          <input
            type="text"
            placeholder="Search products..."
            className="search_input"
            onChange={handleInputChange}
          />
        </form>
      </div>
      {filteredProducts.length > 0 && (
        <div className="products">
          {filteredProducts.slice((page - 1) * 10, page * 10).map((product) => (
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
          ))}
        </div>
      )}
      {filteredProducts.length > 0 && (
        <div className="pagination">
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
                className={
                  page < products.length / 10 ? "" : "hide_right_arrow"
                }
              >
                ▶
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Productlisting;
