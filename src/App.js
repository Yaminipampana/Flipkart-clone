import { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { Container, Typography, Grid, Button, Box } from "@mui/material";
import Navbar from "./Navbar";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import Carousel from "./Carousal";
import Search from "./Search";
import Cart from "./Cart";

function RequireAuth({ children }) {
  const location = useLocation();
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function AppContent({ products }) {
  const location = useLocation();
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const featuredCategories = [
    { value: "smartphones", label: "Smartphones" },
    { value: "laptops", label: "Laptops" },
    { value: "fragrances", label: "Fragrances" },
    { value: "mens-shirts", label: "Mens Shirts" },
  ];

  const productsByCategory = {};
  featuredCategories.forEach((cat) => {
    productsByCategory[cat.value] = products
      .filter((item) => item.category === cat.value)
      .slice(0, 12);
  });

  return (
    <>
      {location.pathname !== "/login" && location.pathname !== "/signup" && (
        <Navbar />
      )}

      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <>
                  <Carousel />

                  {featuredCategories.map((cat) => (
                    <Box key={cat.value} sx={{ mb: 6 }}>
                      <Typography
                        variant="h5"
                        sx={{ mb: 2, fontWeight: "bold" }}
                      >
                        {cat.label}
                      </Typography>

                      <Grid container spacing={2}>
                        {productsByCategory[cat.value]?.map((product, idx) => (
                          <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                            <Box
                              sx={{
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                padding: "16px",
                                height: "100%",
                              }}
                            >
                              <img
                                src={product.thumbnail}
                                alt={product.title}
                                style={{
                                  width: "100%",
                                  height: "160px",
                                  objectFit: "contain",
                                  marginBottom: "12px",
                                }}
                              />
                              <Typography variant="subtitle1" fontWeight="bold">
                                {product.title}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {product.description}
                              </Typography>
                              <Typography
                                sx={{
                                  mt: 1,
                                  color: "green",
                                  fontWeight: "bold",
                                }}
                              >
                                ₹{product.price}
                                {product.discountPercentage && (
                                  <span
                                    style={{
                                      marginLeft: "8px",
                                      color: "orange",
                                    }}
                                  >
                                    ({product.discountPercentage}% OFF)
                                  </span>
                                )}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                Stock: {product.stock} | Brand: {product.brand}
                              </Typography>
                              <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                                <Button
                                  fullWidth
                                  variant="contained"
                                  onClick={() => {
                                    fetch(
                                      "https://flipkart-backend-1-pjtm.onrender.com/cart/add",
                                      {
                                        method: "POST",
                                        headers: {
                                          "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({
                                          ...product,
                                          productId: product.id,
                                          quantity: 1,
                                          user: 2,
                                          id: product.id,
                                        }),
                                      }
                                    )
                                      .then((res) => res.json())
                                      .then(() => alert("Added to cart"))
                                      .catch(() =>
                                        alert("Failed to add to cart")
                                      );
                                  }}
                                >
                                  Add to Cart
                                </Button>
                                <Button
                                  fullWidth
                                  variant="contained"
                                  color="success"
                                  onClick={() => {
                                    fetch(
                                      "https://flipkart-backend-1-pjtm.onrender.com/cart/add",
                                      {
                                        method: "POST",
                                        headers: {
                                          "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({
                                          ...product,
                                          productId: product.id,
                                          quantity: 1,
                                          user: 2,
                                          id: product.id,
                                        }),
                                      }
                                    )
                                      .then((res) => res.json())
                                      .then(() => {
                                        window.location.href = "/cart";
                                      })
                                      .catch(() => alert("Failed to buy now"));
                                  }}
                                >
                                  Buy Now
                                </Button>
                              </Box>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  ))}
                </>
              </RequireAuth>
            }
          />
          <Route
            path="/search"
            element={
              <RequireAuth>
                <Search />
              </RequireAuth>
            }
          />
          <Route
            path="/cart"
            element={
              <RequireAuth>
                <Cart />
              </RequireAuth>
            }
          />
        </Routes>
      </Container>
    </>
  );
}

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://flipkart-backend-1-pjtm.onrender.com/products")
      .then((res) => res.json())
      .then((data) => {
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

  return (
    <Router>
      <AppContent products={products} />
    </Router>
  );
}

export default App;
