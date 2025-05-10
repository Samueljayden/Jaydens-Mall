// import axios from "axios";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";

// const SingleProduct = () => {
//     const { state } = useLocation();
//     const navigate = useNavigate();
//     const product = state?.product;

//     const [phone, setPhone] = useState("");
//     const [loading, setLoading] = useState("");
//     const [success, setSuccess] = useState("");
//     const [error, setError] = useState("");
//     const [reviews, setReviews] = useState([]);
//     const [newReview, setNewReview] = useState({ rating: 1, comment: "" });

//     const img_url = "https://samuelgreg.pythonanywhere.com/static/images/";

//     useEffect(() => {
//         if (!product) navigate("/");
//     }, [product, navigate]);

//     const mockReviews = [
//         { customer_name: "John Doe", rating: 5, comment: "Great product! Highly recommend." },
//         { customer_name: "Jane Smith", rating: 4, comment: "Good quality, slow delivery." },
//         { customer_name: "Samuel K.", rating: 3, comment: "Expected more features for the price." },
//     ];

//     const fetchReviews = async () => {
//         try {
//             const res = await axios.get(`https://samuelgreg.pythonanywhere.com/api/get_reviews/${product.id}`);
//             setReviews(res.data.length > 0 ? res.data : mockReviews);
//         } catch {
//             setReviews(mockReviews);
//         }
//     };

//     const submitReview = async (e) => {
//         e.preventDefault();
//         setError("");
//         setSuccess("");
//         try {
//             const form = new FormData();
//             form.append("rating", newReview.rating);
//             form.append("comment", newReview.comment);
//             form.append("productId", product.id);

//             await axios.post("https://samuelgreg.pythonanywhere.com/api/submit_review", form);
//             setSuccess("Review submitted!");
//             setReviews([...reviews, { customer_name: "You", ...newReview }]);
//             setNewReview({ rating: 1, comment: "" });
//         } catch {
//             setError("Failed to submit review.");
//         }
//     };

//     const submitPayment = async (e) => {
//         e.preventDefault();
//         setLoading("Processing payment...");
//         setError("");
//         setSuccess("");
//         try {
//             const form = new FormData();
//             form.append("phone", phone);
//             form.append("amount", product.product_cost);

//             const res = await axios.post("https://samuelgreg.pythonanywhere.com/api/mpesa_payment", form);
//             setSuccess(res.data.message);
//         } catch (err) {
//             setError(err.message || "Payment failed.");
//         } finally {
//             setLoading("");
//         }
//     };

//     useEffect(() => {
//         if (product) fetchReviews();
//     }, [product]);

//     if (!product) return null;

//     return (
//         <div className="container mt-5">
//             <div className="row justify-content-center">
//                 {/* Product Image */}
//                 <div className="col-md-6">
//                     <img
//                         src={img_url + product.product_photo}
//                         className="img-fluid rounded shadow-sm"
//                         alt={product.product_name}
//                     />
//                 </div>

//                 {/* Payment + Product Info */}
//                 <div className="col-md-5 bg-light rounded shadow-sm p-4">
//                     <h2 className="text-center text-primary fw-bold">{product.product_name}</h2>
//                     <h4 className="text-warning text-center mb-3">
//                         {product.product_cost.toLocaleString("en-KE", {
//                             style: "currency",
//                             currency: "KES"
//                         })}
//                     </h4>
//                     <p className="text-muted text-center">{product.product_desc}</p>

//                     {loading && <div className="alert alert-info">{loading}</div>}
//                     {success && <div className="alert alert-success">{success}</div>}
//                     {error && <div className="alert alert-danger">{error}</div>}

//                     <form onSubmit={submitPayment} className="mt-3">
//                         <div className="mb-3">
//                             <input
//                                 type="number"
//                                 className="form-control"
//                                 value={product.product_cost}
//                                 readOnly
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <input
//                                 type="tel"
//                                 className="form-control"
//                                 required
//                                 placeholder="Enter Mpesa No e.g. 2547XXXXXXX"
//                                 onChange={(e) => setPhone(e.target.value)}
//                             />
//                         </div>
//                         <button className="btn btn-primary w-100">Pay Now</button>
//                     </form>
//                 </div>
//             </div>

//             {/* Reviews */}
//             <div className="row mt-5">
//                 <div className="col-md-10 mx-auto">
//                     <h3 className="text-primary text-center mb-4">Customer Reviews</h3>

//                     {reviews.map((r, i) => (
//                         <div key={i} className="border rounded p-3 mb-3 shadow-sm">
//                             <div className="d-flex justify-content-between">
//                                 <strong>{r.customer_name}</strong>
//                                 <span className="text-warning">{'★'.repeat(r.rating)}</span>
//                             </div>
//                             <p className="mb-0">{r.comment}</p>
//                         </div>
//                     ))}

//                     {/* Review Form */}
//                     <form onSubmit={submitReview} className="mt-4">
//                         <div className="mb-3">
//                             <label className="form-label">Your Rating</label>
//                             <select
//                                 className="form-select"
//                                 value={newReview.rating}
//                                 onChange={(e) =>
//                                     setNewReview({ ...newReview, rating: parseInt(e.target.value) })
//                                 }
//                             >
//                                 {[1, 2, 3, 4, 5].map((s) => (
//                                     <option key={s} value={s}>
//                                         {s} Star{s > 1 && 's'}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className="mb-3">
//                             <textarea
//                                 className="form-control"
//                                 rows="3"
//                                 placeholder="Write your review..."
//                                 value={newReview.comment}
//                                 onChange={(e) =>
//                                     setNewReview({ ...newReview, comment: e.target.value })
//                                 }
//                             />
//                         </div>
//                         <button className="btn btn-success w-100">Submit Review</button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SingleProduct;
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const SingleProduct = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const product = state?.product;

    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ rating: 1, comment: "" });
    const [similarProducts, setSimilarProducts] = useState([]); // State for similar products

    const img_url = "https://samuelgreg.pythonanywhere.com/static/images/";

    useEffect(() => {
        if (!product) navigate("/");
    }, [product, navigate]);

    const mockReviews = [
        { customer_name: "John Doe", rating: 5, comment: "Great product! Highly recommend." },
        { customer_name: "Jane Smith", rating: 4, comment: "Good quality, slow delivery." },
        { customer_name: "Samuel K.", rating: 3, comment: "Expected more features for the price." },
    ];

    const fetchReviews = async () => {
        try {
            const res = await axios.get(`https://samuelgreg.pythonanywhere.com/api/get_reviews/${product.id}`);
            setReviews(res.data.length > 0 ? res.data : mockReviews);
        } catch {
            setReviews(mockReviews);
        }
    };

    const fetchSimilarProducts = async () => {
        try {
            // Assuming an API endpoint that fetches similar products based on category or brand
            const res = await axios.get(`https://samuelgreg.pythonanywhere.com/api/similar_products/${product.id}`);
            setSimilarProducts(res.data);
        } catch (err) {
            console.error("Error fetching similar products", err);
            setSimilarProducts([]); // Fallback if error occurs
        }
    };

    const submitReview = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        try {
            const form = new FormData();
            form.append("rating", newReview.rating);
            form.append("comment", newReview.comment);
            form.append("productId", product.id);

            await axios.post("https://samuelgreg.pythonanywhere.com/api/submit_review", form);
            setSuccess("Review submitted!");
            setReviews([...reviews, { customer_name: "You", ...newReview }]);
            setNewReview({ rating: 1, comment: "" });
        } catch {
            setError("Failed to submit review.");
        }
    };

    const submitPayment = async (e) => {
        e.preventDefault();
        setLoading("Processing payment...");
        setError("");
        setSuccess("");
        try {
            const form = new FormData();
            form.append("phone", phone);
            form.append("amount", product.product_cost);

            const res = await axios.post("https://samuelgreg.pythonanywhere.com/api/mpesa_payment", form);
            setSuccess(res.data.message);
        } catch (err) {
            setError(err.message || "Payment failed.");
        } finally {
            setLoading("");
        }
    };

    useEffect(() => {
        if (product) {
            fetchReviews();
            fetchSimilarProducts(); // Fetch similar products on product load
        }
    }, [product]);

    if (!product) return null;

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                {/* Product Image */}
                <div className="col-md-6">
                    <img
                        src={img_url + product.product_photo}
                        className="img-fluid rounded shadow-sm"
                        alt={product.product_name}
                    />
                </div>

                {/* Payment + Product Info */}
                <div className="col-md-5 bg-light rounded shadow-sm p-4">
                    <h2 className="text-center text-primary fw-bold">{product.product_name}</h2>
                    <h4 className="text-warning text-center mb-3">
                        {product.product_cost.toLocaleString("en-KE", {
                            style: "currency",
                            currency: "KES"
                        })}
                    </h4>
                    <p className="text-muted text-center">{product.product_desc}</p>

                    {loading && <div className="alert alert-info">{loading}</div>}
                    {success && <div className="alert alert-success">{success}</div>}
                    {error && <div className="alert alert-danger">{error}</div>}

                    <form onSubmit={submitPayment} className="mt-3">
                        <div className="mb-3">
                            <input
                                type="number"
                                className="form-control"
                                value={product.product_cost}
                                readOnly
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="tel"
                                className="form-control"
                                required
                                placeholder="Enter Mpesa No e.g. 2547XXXXXXX"
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <button className="btn btn-primary w-100">Pay Now</button>
                    </form>
                </div>
            </div>

            {/* Reviews */}
            <div className="row mt-5">
                <div className="col-md-10 mx-auto">
                    <h3 className="text-primary text-center mb-4">Customer Reviews</h3>

                    {reviews.map((r, i) => (
                        <div key={i} className="border rounded p-3 mb-3 shadow-sm">
                            <div className="d-flex justify-content-between">
                                <strong>{r.customer_name}</strong>
                                <span className="text-warning">{'★'.repeat(r.rating)}</span>
                            </div>
                            <p className="mb-0">{r.comment}</p>
                        </div>
                    ))}

                    {/* Review Form */}
                    <form onSubmit={submitReview} className="mt-4">
                        <div className="mb-3">
                            <label className="form-label">Your Rating</label>
                            <select
                                className="form-select"
                                value={newReview.rating}
                                onChange={(e) =>
                                    setNewReview({ ...newReview, rating: parseInt(e.target.value) })
                                }
                            >
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <option key={s} value={s}>
                                        {s} Star{s > 1 && 's'}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <textarea
                                className="form-control"
                                rows="3"
                                placeholder="Write your review..."
                                value={newReview.comment}
                                onChange={(e) =>
                                    setNewReview({ ...newReview, comment: e.target.value })
                                }
                            />
                        </div>
                        <button className="btn btn-success w-100">Submit Review</button>
                    </form>
                </div>
            </div>

            {/* Similar Products Section */}
            <div className="row mt-5">
                <div className="col-md-12">
                    <h3 className="text-primary text-center mb-4">Similar Products</h3>
                    <div className="row">
                        {similarProducts.length > 0 ? (
                            similarProducts.map((prod, index) => (
                                <div key={index} className="col-md-4 mb-4">
                                    <div className="card">
                                        <img
                                            src={img_url + prod.product_photo}
                                            alt={prod.product_name}
                                            className="card-img-top"
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{prod.product_name}</h5>
                                            <p className="card-text">
                                                {prod.product_cost.toLocaleString("en-KE", {
                                                    style: "currency",
                                                    currency: "KES"
                                                })}
                                            </p>
                                            <a href={`/product/${prod.id}`} className="btn btn-primary w-100">
                                                View Product
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-muted">No similar products found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;
