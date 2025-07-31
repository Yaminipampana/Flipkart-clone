import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Search() {
  const [products, setProducts] = useState([]);
  const query = useQuery().get("q") || "";

  useEffect(() => {
    fetch("https://flipkart-backend-1-pjtm.onrender.com/products")
      .then((res) => res.json())
      .then((data) => {
        // Flatten if needed
        let allProducts = [];
        if (Array.isArray(data) && data.length > 0 && data[0].products) {
          data.forEach((doc) => {
            if (Array.isArray(doc.products)) {
              allProducts = allProducts.concat(doc.products);
            }
          });
        } else if (Array.isArray(data)) {
          allProducts = data;
        }
        setProducts(allProducts);
      });
  }, []);

  const filtered = products.filter(
    (product) =>
      !product.deleted &&
      (product.title?.toLowerCase().includes(query.toLowerCase()) ||
        product.description?.toLowerCase().includes(query.toLowerCase()) ||
        product.brand?.toLowerCase().includes(query.toLowerCase()) ||
        product.category?.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Search Results for "{query}"</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            No products found.
          </div>
        )}
        {filtered.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow p-4 flex flex-col items-start"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-40 object-contain mb-3 rounded"
            />
            <div className="font-semibold text-base mb-1 line-clamp-2 min-h-[48px]">
              {product.title}
            </div>
            <div className="text-gray-600 text-sm mb-1 line-clamp-2 min-h-[32px]">
              {product.description}
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-blue-600 font-bold text-lg">
                ₹{product.price}
              </span>
              <span className="text-green-600 font-semibold text-xs">
                {product.discountPercentage}% off
              </span>
            </div>
            <div className="flex items-center mb-1">
              <span className="bg-green-600 text-white text-xs font-semibold px-2 py-0.5 rounded mr-2">
                {product.rating} ★
              </span>
              <span className="text-xs text-gray-500">
                Stock: {product.stock}
              </span>
            </div>
            <div className="text-xs text-gray-500 mb-1">
              Brand: {product.brand}
            </div>
            <div className="text-xs text-gray-500 mb-1">
              Category: {product.category}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
