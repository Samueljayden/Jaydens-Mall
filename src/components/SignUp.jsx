// import axios from "axios";
// import { useState } from "react";
// import Footer from "./Footer";

// const SignUp = () => {
//     let [username, setUserName] = useState("");
//     let [email, setEmail] = useState("");
//     let [phone, setPhone] = useState("");
//     let [password, setPassword] = useState("");
//     let [loading, setLoading] = useState("");
//     let [success, setSuccess] = useState("");
//     let [error, setError] = useState("");
//     let [passwordStrength, setPasswordStrength] = useState("");
//     let [showPassword, setShowPassword] = useState(false);

//     const submitForm = async (e) => {
//         e.preventDefault();
//         try {
//             setLoading("Please wait as we upload your data");
//             setError("");

//             const data = new FormData();
//             data.append("username", username);
//             data.append("email", email);
//             data.append("phone", phone);
//             data.append("password", password);

//             const response = await axios.post("http://Samuelgreg.pythonanywhere.com/api/signup", data);

//             setLoading("");
//             setSuccess(response.data.success);
//             setUserName("");
//             setEmail("");
//             setPhone("");
//             setPassword("");
//             setPasswordStrength("");
//         } catch (error) {
//             setLoading("");
//             setError(error.message);
//         }
//     };

//     const generatePassword = () => {
//         if (!username || username.length < 4) {
//             setError("Please enter at least 4 characters for the username before generating a password.");
//             return;
//         }

//         const symbols = "!@#$%^&*()_+";
//         const numbers = "0123456789";
//         const mix = symbols + numbers;

//         const namePart = username.substring(0, 4).toLowerCase();
//         const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
//         const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];

//         let extraMix = "";
//         for (let i = 0; i < 2; i++) {
//             extraMix += mix[Math.floor(Math.random() * mix.length)];
//         }

//         const generated = namePart + randomSymbol + randomNumber + extraMix;

//         setPassword(generated);
//         checkPasswordStrength(generated);
//         setError("");
//     };

//     const checkPasswordStrength = (pass) => {
//         let strength = "";
//         const lengthCriteria = pass.length >= 8;
//         const numberCriteria = /\d/.test(pass);
//         const symbolCriteria = /[!@#$%^&*()_+]/.test(pass);
//         const upperCriteria = /[A-Z]/.test(pass);
//         const lowerCriteria = /[a-z]/.test(pass);

//         const passedChecks = [lengthCriteria, numberCriteria, symbolCriteria, upperCriteria, lowerCriteria].filter(Boolean).length;

//         if (passedChecks <= 2) strength = "Weak";
//         else if (passedChecks === 3 || passedChecks === 4) strength = "Moderate";
//         else strength = "Strong";

//         setPasswordStrength(strength);
//     };

//     const handlePasswordChange = (e) => {
//         const value = e.target.value;
//         setPassword(value);
//         checkPasswordStrength(value);
//     };

//     return (
//         <div className="row justify-content-center mt-4">
//             <div className="col-md-6 card shadow p-4">
//                 <h2>Sign Up</h2>
//                 <b className="text-warning">{loading}</b>
//                 <b className="text-danger">{error}</b>
//                 <b className="text-success">{success}</b>

//                 <form onSubmit={submitForm}>
//                     <input
//                         type="text"
//                         placeholder="Enter Username:"
//                         required
//                         className="form-control"
//                         onChange={(e) => setUserName(e.target.value)}
//                         value={username}
//                     />
//                     <br />
//                     <input
//                         type="email"
//                         placeholder="Enter Email:"
//                         required
//                         className="form-control"
//                         onChange={(e) => setEmail(e.target.value)}
//                         value={email}
//                     />
//                     <br />
//                     <input
//                         type="tel"
//                         placeholder="Enter Phone Number:"
//                         required
//                         className="form-control"
//                         onChange={(e) => setPhone(e.target.value)}
//                         value={phone}
//                     />
//                     <br />

//                     <div className="input-group">
//                         <input
//                             type={showPassword ? "text" : "password"}
//                             placeholder="Enter Password:"
//                             required
//                             className="form-control"
//                             onChange={handlePasswordChange}
//                             value={password}
//                             id="password"
//                         />
//                         <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword(!showPassword)}>
//                             {showPassword ? "Hide" : "Show"}
//                         </button>
//                         <button type="button" className="btn btn-outline-primary" onClick={generatePassword}>
//                             Generate
//                         </button>
//                     </div>
//                     {password && (
//                         <div className={`mt-2 fw-bold text-${passwordStrength === "Weak" ? "danger" : passwordStrength === "Moderate" ? "warning" : "success"}`}>
//                             Password Strength: {passwordStrength}
//                         </div>
//                     )}
//                     <br />
//                     <button type="submit" className="btn btn-primary w-100">
//                         Sign Up
//                     </button>
//                 </form>
//             </div>
//             <br />
//             <hr />
//             <br />
//             <Footer />
//         </div>
//     );
// };

// export default SignUp;
import axios from "axios";
import { useState } from "react";
import Footer from "./Footer";

const SignUp = () => {
    let [username, setUserName] = useState("");
    let [email, setEmail] = useState("");
    let [phone, setPhone] = useState("");
    let [password, setPassword] = useState("");
    let [loading, setLoading] = useState("");
    let [success, setSuccess] = useState("");
    let [error, setError] = useState("");
    let [passwordStrength, setPasswordStrength] = useState("");
    let [showPassword, setShowPassword] = useState(false);

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            setLoading("Please wait as we upload your data");
            setError("");

            const data = new FormData();
            data.append("username", username);
            data.append("email", email);
            data.append("phone", phone);
            data.append("password", password);

            const response = await axios.post("http://Samuelgreg.pythonanywhere.com/api/signup", data);

            setLoading("");
            setSuccess(response.data.success);

            // Save the username to localStorage upon successful sign-up
            localStorage.setItem("username", username);

            // Clear form fields
            setUserName("");
            setEmail("");
            setPhone("");
            setPassword("");
            setPasswordStrength("");
        } catch (error) {
            setLoading("");
            setError(error.message);
        }
    };

    const generatePassword = () => {
        if (!username || username.length < 4) {
            setError("Please enter at least 4 characters for the username before generating a password.");
            return;
        }

        const symbols = "!@#$%^&*()_+";
        const numbers = "0123456789";
        const mix = symbols + numbers;

        const namePart = username.substring(0, 4).toLowerCase();
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];

        let extraMix = "";
        for (let i = 0; i < 2; i++) {
            extraMix += mix[Math.floor(Math.random() * mix.length)];
        }

        const generated = namePart + randomSymbol + randomNumber + extraMix;

        setPassword(generated);
        checkPasswordStrength(generated);
        setError("");
    };

    const checkPasswordStrength = (pass) => {
        let strength = "";
        const lengthCriteria = pass.length >= 8;
        const numberCriteria = /\d/.test(pass);
        const symbolCriteria = /[!@#$%^&*()_+]/.test(pass);
        const upperCriteria = /[A-Z]/.test(pass);
        const lowerCriteria = /[a-z]/.test(pass);

        const passedChecks = [lengthCriteria, numberCriteria, symbolCriteria, upperCriteria, lowerCriteria].filter(Boolean).length;

        if (passedChecks <= 2) strength = "Weak";
        else if (passedChecks === 3 || passedChecks === 4) strength = "Moderate";
        else strength = "Strong";

        setPasswordStrength(strength);
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        checkPasswordStrength(value);
    };

    return (
        <div className="row justify-content-center mt-4">
            <div className="col-md-6 card shadow p-4">
                <h2>Sign Up</h2>
                <b className="text-warning">{loading}</b>
                <b className="text-danger">{error}</b>
                <b className="text-success">{success}</b>

                <form onSubmit={submitForm}>
                    <input
                        type="text"
                        placeholder="Enter Username:"
                        required
                        className="form-control"
                        onChange={(e) => setUserName(e.target.value)}
                        value={username}
                    />
                    <br />
                    <input
                        type="email"
                        placeholder="Enter Email:"
                        required
                        className="form-control"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <br />
                    <input
                        type="tel"
                        placeholder="Enter Phone Number:"
                        required
                        className="form-control"
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                    />
                    <br />

                    <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password:"
                            required
                            className="form-control"
                            onChange={handlePasswordChange}
                            value={password}
                            id="password"
                        />
                        <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? "Hide" : "Show"}
                        </button>
                        <button type="button" className="btn btn-outline-primary" onClick={generatePassword}>
                            Generate
                        </button>
                    </div>
                    {password && (
                        <div className={`mt-2 fw-bold text-${passwordStrength === "Weak" ? "danger" : passwordStrength === "Moderate" ? "warning" : "success"}`}>
                            Password Strength: {passwordStrength}
                        </div>
                    )}
                    <br />
                    <button type="submit" className="btn btn-primary w-100">
                        Sign Up
                    </button>
                </form>
            </div>
            <br />
            <hr />
            <br />
            <Footer />
        </div>
    );
};

export default SignUp;
