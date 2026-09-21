import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import images from "../images/AbrahamolaLogo.png";
import "../style/forms.css";

const CodeRequester = () => {
    const [identifier, setIdentifier] = useState('');
    const [code, setCode] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    const requestCode = async () => {
        try {
            const response = await fetch('http://localhost:5000/RequestPasswordReset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Unable to request code');
            setEmail(data.email);
            setStatus(`Security code: ${data.code}`);
        } catch (error) {
            setStatus(error.message);
        }
    };

    const handleSubmit = event => {
        event.preventDefault();
        if (!email || !code) {
            setStatus('Request and enter your security code first.');
            return;
        }
        navigate('/CreatePassword', { state: { email, code } });
    };

    return (
        <> 
            <div className="header">
                <img src={images} alt="Abrahamola Logo" srcset="" />
                <p>You can request a password reset below. We will send a securitycode<br />to the emaill address, please make sure it is correct.</p>
            </div>

            <section className="loginForm">
                <div className="columns">
                    <form onSubmit={handleSubmit}>
                        <div className="column">
                            <div className="formGroup CodeRequest">
                                <label htmlFor="emailAddress">E-mail Address or Contact Number</label><br />
                                <input type="text" name="emailAddress" id="emailAddress" value={identifier} onChange={event => setIdentifier(event.target.value)} placeholder="Enter your E-mail Address or Contact Number" required /><br />
                                <button type="button" className="CodeBtn" onClick={requestCode}>Send Security Code</button>
                            </div>

                            <div className="formGroup CodeRequest">
                                <label htmlFor="Code">Enter Code</label><br />
                                <input type="text" name="Code" id="Code" value={code} onChange={event => setCode(event.target.value)} placeholder="000 000" required />
                            </div>
                        </div>
                        <button type="submit">Continue</button>
                        {status && <p style={{ textAlign: 'center'}} role="status">{status}</p>}
                    </form>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default CodeRequester