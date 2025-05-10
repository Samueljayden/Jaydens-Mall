import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Carousel from "./Carousel";
import Footer from "./Footer";

const GetProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState("Fetching products...");
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCartState] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState({});

  const setCart = (newCart) => {
    setCartState(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const navigate = useNavigate();

  const fetchProducts = async () => {
    setError(null);
    setLoading("Fetching products...");
    try {
      const res = await axios.get("https://Samuelgreg.pythonanywhere.com/api/getproducts");
      setProducts(res.data);
      setLoading(null);
    } catch {
      setLoading(null);
      setError("Failed to fetch products.");
    }
  };

  useEffect(() => {
    fetchProducts();
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const groupedProducts = products.reduce((acc, product) => {
    const cat = product.product_cat;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(product);
    return acc;
  }, {});

  useEffect(() => {
    const initialCounts = {};
    for (let cat of Object.keys(groupedProducts)) {
      initialCounts[cat] = 8;
    }
    setVisibleCount(initialCounts);
  }, [products]);

  const addToCart = (product) => {
    const exists = cart.find(p => p.product_id === product.product_id);
    if (exists) {
      setCart(cart.map(p =>
        p.product_id === product.product_id
          ? { ...p, quantity: p.quantity + 1 }
          : p
      ));
      alert("Product quantity updated in cart");
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
      alert("Product added to cart");
    }
  };

  const filteredCategories = ["All", ...new Set(products.map(p => p.product_cat))];

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Jayden's Mall</a>
        </div>
      </nav>

      <div className="container mt-5 pt-5">
        <Carousel />
        <hr />

        {loading && <div className="text-primary text-center">{loading}</div>}

        <div className="row g-2 justify-content-center mt-4">
          <div className="col-md-4 col-12">
            <input
              type="text"
              className="form-control border border-primary"
              placeholder="🔍 Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md-3 col-12">
            <select
              className="form-select border border-primary"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {filteredCategories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3 col-12">
            <select
              className="form-select border border-primary"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">Price: Low → High</option>
              <option value="desc">Price: High → Low</option>
            </select>
          </div>
        </div>

        <h3 className="text-success mt-4">Available Products</h3>
        {error && <b className="text-danger">{error}</b>}

        {Object.entries(groupedProducts)
          .filter(([cat]) => selectedCategory === "All" || cat === selectedCategory)
          .map(([cat, catProducts]) => {
            const visible = visibleCount[cat] || 8;
            const filtered = catProducts
              .filter(p => p.product_name.toLowerCase().includes(searchTerm.toLowerCase()))
              .sort((a, b) => sortOrder === "asc" ? a.product_cost - b.product_cost : b.product_cost - a.product_cost)
              .slice(0, visible);

            return (
              <div key={cat} className="mt-4">
                <h4 className="text-primary">{cat}</h4>
                <div className="row">
                  {filtered.map(product => (
                    <div key={product.product_id} className="col-md-3 mb-4">
                      <div className="card shadow-sm">
                        <img
                          src={`https://Samuelgreg.pythonanywhere.com/static/images/${product.product_photo}`}
                          alt={product.product_name}
                          className="card-img-top"
                          style={{
                            height: "230px",
                            objectFit: "cover",
                            width: "100%",
                          }}
                        />
                        <div className="card-body">
                          <h5 className="text-black">{product.product_name}</h5>
                          <p className="text-muted">{product.product_desc.slice(0, 20)}...</p>
                          <b className="text-success">Ksh {product.product_cost}</b>
                          <div className="mt-3 d-grid gap-2">
                            <button
                              className="btn btn-primary w-100"
                              onClick={() => addToCart(product)}
                            >
                              🛒 Add to Cart
                            </button>
                            <button
                              className="btn btn-dark w-100"
                              onClick={() =>
                                navigate("/singleproduct", { state: { product } })
                              }
                            >
                              View Product
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filtered.length < catProducts.length && (
                  <div className="text-center my-2">
                    <button
                      className="btn btn-outline-primary"
                      onClick={() =>
                        setVisibleCount(prev => ({
                          ...prev,
                          [cat]: (prev[cat] || 8) + 8
                        }))
                      }
                    >
                      Load More
                    </button>
                  </div>
                )}
              </div>
            );
          })}

        <Footer />
      </div>
    </div>
  );
};

export default GetProducts;
