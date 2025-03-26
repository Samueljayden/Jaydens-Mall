import axios from "axios";
import { useState } from "react";
import { useNavigate, Link  } from "react-router-dom";
import Footer from "./Footer";

const SignIn = () => {

    let[username, setUsername] = useState("");
    let[password, setPassword] = useState("");
    let[success, setSuccess] = useState("");
    let[error, setError] = useState("");
    let[loading, setLoading] = useState ("");

    const navigate = useNavigate()

    const submitForm = async (e) => {
        e.preventDefault();

        try {
            setError("");
            setSuccess("");
            setLoading("Please wait ....");

            const data = new FormData()
            data.append("username", username);
            data.append("password", password);

            const response = await axios.post("http://Samuelgreg.pythonanywhere.com/api/signin ", data);
            
            if(response.data.user) {
                localStorage.setItem("user", JSON.stringify(response.data.user))
                navigate("/");
            } else {
                setLoading("");
                setError(response.data.message);
            }
        } catch (error) {
            setLoading("");
            setError(error.message);
        }
    };

    const togglePassword = () => {
        const passwordInput = document.getElementById("password");
        const icon = document.getElementById("icon")

        let current_type = passwordInput.getAttribute("type")
        let new_type = ""
        if (current_type === "password"){
            new_type = "text"
            icon.classList.remove("bi-eye-fill");
            icon.classList.add("bi-eye-slash-fill");
        } else {
            new_type = "password"
            icon.classList.add("bi-eye-slash-fill");
            icon.classList.remove("bi-eye-fill");
        }
        passwordInput.setAttribute("type", new_type);

    }
    return (
       <div className="row justify-content-center mt-4">
        <div className="col-md-6 card shadow p-4">
            <h2>Sign In</h2>
            <b className="text-success">{success}</b>
            <b className="text-warning">{loading}</b>
            <b className="text-danger">{error}</b>
            <form onSubmit={submitForm}>
                <input type="text" placeholder="Enter Username :" required className="form-control" onChange={(e) => setUsername(e.target.value)} />
                <br />
                <div className="input-group">
                <input type="text" placeholder="Enter Password :" required id="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                <span className="input-group-text" onClick={togglePassword}><i id="icon" class="bi bi-eye-fill"></i></span>
                </div>
                <br />
                <button className="btn btn-primary" type="submit">Signin</button>
            </form>

            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
        <br />
        <hr />
        <br />
        <Footer />
       </div>
    );
}
 
export default SignIn;