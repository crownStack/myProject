import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import images from "../images/AbrahamolaLogo.png";

const NewPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async event => {
        event.preventDefault();
        const { email, code } = location.state || {};
        if (!email || !code) {
            setStatus('Please request a new security code.');
            return;
        }
        try {
            const response = await fetch('http://localhost:5000/ResetPassword', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, code, newPassword })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Unable to reset password');
            navigate('/Signin');
        } catch (error) {
            setStatus(error.message);
        }
    };

    return (
        <> 
            <div className="header">
                <img src={images} alt="Abrahamola Logo" srcset="" />
                <p>Create a New password to Login</p> 
            </div>

            <section className="loginForm">
                <div className="columns">
                    <form onSubmit={handleSubmit}>
                        <div className="column">
                            <div className="formGroup">
                                <label htmlFor="newPassword">New Password</label><br />
                                <input type="password" name="newPassword" id="newPassword" value={newPassword} onChange={event => setNewPassword(event.target.value)} minLength="6" placeholder="Enter your New Password" required />
                            </div>

                        </div>
                        <button type="submit">Reset password</button>
                        {status && <p role="status">{status}</p>}
                    </form>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default NewPassword