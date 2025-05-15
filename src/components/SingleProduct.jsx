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
    const [paymentMethod, setPaymentMethod] = useState("mpesa"); // Default payment method
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ rating: 1, comment: "" });

    const img_url = "https://samuelgreg.pythonanywhere.com/static/images/";

    useEffect(() => {
        if (!product) navigate("/");
    }, [product, navigate]);

    const fetchReviews = async () => {
        try {
            const res = await axios.get(`https://samuelgreg.pythonanywhere.com/api/get_reviews/${product.id}`);
            setReviews(res.data.length > 0 ? res.data : []);
        } catch {
            setReviews([]);
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
            form.append("amount", product.product_cost);

            if (paymentMethod === "mpesa" || paymentMethod === "airtel") {
                if (!phone) {
                    setError("Please enter your phone number.");
                    setLoading("");
                    return;
                }
                form.append("phone", phone);
                form.append("method", paymentMethod);

                const res = await axios.post("https://samuelgreg.pythonanywhere.com/api/payment", form);
                setSuccess(res.data.message);
            } else if (paymentMethod === "paypal") {
                const res = await axios.post("https://samuelgreg.pythonanywhere.com/api/paypal_payment", {
                    amount: product.product_cost,
                });
                setSuccess(res.data.message);
            } else if (paymentMethod === "credit_card") {
                const res = await axios.post("https://samuelgreg.pythonanywhere.com/api/credit_card_payment", {
                    amount: product.product_cost,
                });
                setSuccess(res.data.message);
            } else {
                setError("Invalid payment method selected.");
            }
        } catch (err) {
            setError(err.message || "Payment failed.");
        } finally {
            setLoading("");
        }
    };

    useEffect(() => {
        if (product) fetchReviews();
    }, [product]);

    if (!product) return null;

    // Static comments with 5-star ratings
    const staticComments = [
        { customer_name: "John Doe", rating: 5, comment: "This mall has everything you need! Highly recommend shopping here!" },
        { customer_name: "Jane Smith", rating: 5, comment: "Amazing experience! Great customer service and convenient payment options." },
        { customer_name: "Samuel K.", rating: 5, comment: "Fast delivery and excellent product quality. Highly recommend!" },
        { customer_name: "Emily Johnson", rating: 5, comment: "Best shopping experience! The reviews helped me make the right choices." },
        { customer_name: "Michael Brown", rating: 5, comment: "One-stop shop for everything! Payment options like M-Pesa make it so easy." },
    ];

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
                            currency: "KES",
                        })}
                    </h4>
                    <p className="text-muted text-center">{product.product_desc}</p>

                    {loading && <div className="alert alert-info">{loading}</div>}
                    {success && <div className="alert alert-success">{success}</div>}
                    {error && <div className="alert alert-danger">{error}</div>}

                    <form onSubmit={submitPayment} className="mt-3">
                        {/* Payment Method Selection */}
                        <div className="mb-3">
                            <label className="form-label">Select Payment Method</label>
                            <select
                                className="form-select"
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            >
                                <option value="mpesa">M-Pesa</option>
                                <option value="airtel">Airtel Money</option>
                                <option value="paypal">PayPal</option>
                                <option value="credit_card">Credit Card</option>
                            </select>
                        </div>

                        {/* Phone Number Input (for M-Pesa and Airtel Money) */}
                        {(paymentMethod === "mpesa" || paymentMethod === "airtel") && (
                            <div className="mb-3">
                                <input
                                    type="tel"
                                    className="form-control"
                                    required
                                    placeholder="Enter Phone Number e.g. 2547XXXXXXX"
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                        )}

                        <button className="btn btn-primary w-100">Pay Now</button>
                    </form>
                </div>
            </div>

            {/* Static Comments */}
            <div className="row mt-5">
                <div className="col-md-10 mx-auto">
                    <h3 className="text-primary text-center mb-4">What Our Customers Say</h3>

                    {staticComments.map((comment, index) => (
                        <div key={index} className="border rounded p-3 mb-3 shadow-sm">
                            <div className="d-flex justify-content-between">
                                <strong>{comment.customer_name}</strong>
                                <span className="text-warning">{'★'.repeat(comment.rating)}</span>
                            </div>
                            <p className="mb-0">{comment.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;