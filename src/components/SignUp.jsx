import axios from "axios";
import { useState } from "react";
import Footer from "./Footer";

const SignUp = () => {
    let [username, setUserName] = useState("");
    let [email, setEmail] = useState ("");
    let [phone, setPhone] = useState("");
    let [password, setPassword] = useState("");
    let [loading, setLoading] = useState("");
    let [success, setSuccess] = useState("");
    let [error, setError] = useState("");

    const submitForm = async (e) => {
        e.preventDefault();

        try {
            setLoading("Please wait as we upload your data");
            setError("")
            const data = new FormData();
            data.append("username", username);
            data.append("email", email);
            data.append("phone", phone);
            data.append("password", password);

            const response = await axios.post("http://Samuelgreg.pythonanywhere.com/api/signup ", data);

            setLoading("");
            setError("")
            setSuccess(response.data.success);
            setUserName("");
            setEmail("");
            setPhone("");
            setPassword("");
            console.log(response);
        } catch (error) {
           setLoading("") ;
           setError(error.message);
        }
    }

    return ( 
        <div className="row justify-content-center mt-4">
        <div className="col-md-6 card shadow p-4">
            <h2>Sign Up</h2>
            <b className="text-warning">{loading}</b>
            <b className="text-danger">{error}</b>
            <b className="text-success">{success}</b>

            <form onSubmit={submitForm}>
            <input type="text" placeholder="Enter Username :" required  className="form-control" onChange={(e) => setUserName(e.target.value)}  value={username}/> <br />
            <input type="text" placeholder="Enter Email :" required className="form-control" onChange={(e) => setEmail(e.target.value)} value={email}/> <br />
            <input type="tel" placeholder="Enter No :" required className="form-control" onChange={(e) => setPhone(e.target.value)} value={phone} /> <br />
            <input type="text" placeholder="Enter Password :" required className="form-control" onChange={(e) => setPassword(e.target.value)} value={password} /> <br />
            <button type="submit" className="btn btn-primary">Sign Up</button> <br />
            </form>
        </div>
        <br />
        <hr />
        <br />
        < Footer />
        </div>
     );
}
 
export default SignUp;