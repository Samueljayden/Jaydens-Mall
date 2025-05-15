import React, { useState } from "react";
import axios from "axios";

const Delivery = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [deliveryCost, setDeliveryCost] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState("mpesa"); // Default payment method
    const [loading, setLoading] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const calculateDeliveryCost = (location) => {
        // Example logic for calculating delivery cost based on location
        const deliveryRates = {
            "Nairobi": 200,
            "Mombasa": 300,
            "Kisumu": 250,
            "Eldoret": 220,
            "Other": 400,
        };
        return deliveryRates[location] || 400; // Default cost for "Other"
    };

    const handleLocationChange = (e) => {
        const location = e.target.value;
        setAddress(location);
        setDeliveryCost(calculateDeliveryCost(location));
    };

    const submitDeliveryPayment = async (e) => {
        e.preventDefault();
        setLoading("Processing payment...");
        setError("");
        setSuccess("");

        try {
            const form = new FormData();
            form.append("name", name);
            form.append("phone", phone);
            form.append("address", address);
            form.append("deliveryCost", deliveryCost);

            if (paymentMethod === "mpesa" || paymentMethod === "airtel") {
                if (!phone) {
                    setError("Please enter your phone number.");
                    setLoading("");
                    return;
                }
                form.append("method", paymentMethod);

                const res = await axios.post("https://samuelgreg.pythonanywhere.com/api/delivery_payment", form);
                setSuccess(res.data.message);
            } else if (paymentMethod === "paypal") {
                const res = await axios.post("https://samuelgreg.pythonanywhere.com/api/paypal_delivery", {
                    name,
                    address,
                    deliveryCost,
                });
                setSuccess(res.data.message);
            } else if (paymentMethod === "credit_card") {
                const res = await axios.post("https://samuelgreg.pythonanywhere.com/api/credit_card_delivery", {
                    name,
                    address,
                    deliveryCost,
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

    return (
        <div className="container mt-5">
            <h2 className="text-center text-primary">Delivery Payment</h2>
            <div className="row justify-content-center">
                <div className="col-md-6 bg-light rounded shadow-sm p-4">
                    {loading && <div className="alert alert-info">{loading}</div>}
                    {success && <div className="alert alert-success">{success}</div>}
                    {error && <div className="alert alert-danger">{error}</div>}

                    <form onSubmit={submitDeliveryPayment}>
                        <div className="mb-3">
                            <label className="form-label">Full Name</label>
                            <input
                                type="text"
                                className="form-control"
                                required
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Phone Number</label>
                            <input
                                type="tel"
                                className="form-control"
                                required
                                placeholder="Enter your phone number e.g. 2547XXXXXXX"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Delivery Location</label>
                            <select
                                className="form-select"
                                required
                                value={address}
                                onChange={handleLocationChange}
                            >
                                <option value="">Select your location</option>
                                <option value="Nairobi">Nairobi</option>
                                <option value="Mombasa">Mombasa</option>
                                <option value="Kisumu">Kisumu</option>
                                <option value="Eldoret">Eldoret</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Delivery Cost</label>
                            <input
                                type="text"
                                className="form-control"
                                readOnly
                                value={`Ksh ${deliveryCost}`}
                            />
                        </div>

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

                        <button className="btn btn-primary w-100">Pay for Delivery</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Delivery;