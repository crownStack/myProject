import React, { useState } from "react";
import Footer from "./Footer";
import images from "../images/AbrahamolaLogo.png";
import { useNavigate } from 'react-router-dom'
import '../style/forms.css'
import { API_URL } from "../config";

const Password = () => {
    const [ formData, setFormData ] = useState({
        createPassword: "",
        confirmPassword: ""
    });
    const [ showPassword, setShowPasword ] = useState(false);

    const [ error, setError ] = useState({ createPassword: '' });
    const [serverError, setServerError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [ e.target.name] : e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError('');

        let newError = { createPassword: "" }

        if(!formData.createPassword || formData.createPassword.length < 6) {
            newError.createPassword = 'password must at least 6 characters'
        }

        if(formData.createPassword !== formData.confirmPassword) {
            newError.createPassword = 'passwords do not match'
        }

        setError(newError);

        if(newError.createPassword) return;

        try {
            const savedSignupData = JSON.parse(localStorage.getItem("signupData") || localStorage.getItem("formData") || "{}");
            const finalData = {
                ...savedSignupData,
                password: formData.createPassword,
                confirmPassword: formData.confirmPassword
            };

            const response = await fetch(`${API_URL}/Password`, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(finalData)
            });

            const data = await response.json();

            if (!response.ok) {
                setServerError(data.error || data.message || "We could not save your password. Please try again.");
                return;
            }
            
            console.log("Password success:", data);
            localStorage.setItem("signupData", JSON.stringify(finalData));
            navigate("/Signin");
            } catch (error) {
                console.error("Password error:", error);
                setServerError("We could not complete your signup. Please try again.");
            }
        }

    return (
        <> 
            <div className="header">
                <img src={images} alt="Abrahamola Logo" />
                <h2>Welcome to Abrahamolas Gadgets</h2>
                <p>Enter your details to create an account with Abrahamolas Gadgets</p>
            </div>

            <section className="loginForm">
                <div className="columns">
                    <form onSubmit={handleSubmit}>
                        <div className="column">
                            <div className="formGroup">
                                <label htmlFor="createPassword">Create a new Password</label><br />
                                <div className="loginPassword">
                                    <input type={ showPassword ? "text" : "password" } value={formData.createPassword} onChange={handleChange} name="createPassword" id="createPassword" placeholder="Enter a strong password" />
                                </div>
                                {error.createPassword && <p style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>{error.createPassword}</p>}
                            </div>

                            <div className="formGroup">
                                <label htmlFor="confirmPassword">Confirm Password</label><br />
                                <div className="loginPassword">
                                    <input type={ showPassword ? "text" : "password" } value={formData.confirmPassword} onChange={handleChange} name="confirmPassword" id="confirmPassword" placeholder="Re-enter your password" />
                                <span onClick={ () => setShowPasword(!showPassword)} style={{cursor: "pointer", fontSize: "30px", color: "black"}}>👁</span></div>
                            </div>
                        </div>
                        {serverError && <p className="form-server-error" role="alert">{serverError}</p>}
                        <button type="submit">Create your Account</button>
                        <p className="signup-password-terms">By creating an account you agree to our <br /> <span>Terms of service and privacy Policy.</span></p>
                    </form>
                </div>
            </section>
 
            <Footer />
        </>
    )
}

export default Password