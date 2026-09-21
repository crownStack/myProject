import { useState } from "react";
import Footer from "./Footer";
import images from "../images/AbrahamolaLogo.png"
import { useNavigate } from 'react-router-dom'
import '../style/forms.css'
import { API_URL } from "../config";

const Signup = () => {
    //Form datas
    const [ formData, setFormData ] = useState({
        email: "",
        firstName: "",
        lastName: "",
        homeAddress: "",
        town: "",
        state: "",
        country: "",
        contact: ""
    });

    //Error message
    const [ error, setError ] = useState({
        email: '',
        firstName: '',
        lastName: '',
        homeAddress: '',
        town: '',
        state: '',
        country: '',
        contact: ''
    });
    const [serverError, setServerError] = useState('');

    const navigate = useNavigate();

    //Handling the input datas
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    //Submit button
    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError('');

        let newErrors = { 
            email: '',
            firstName: '',
            lastName: '', 
            homeAddress: '', 
            town: '', 
            state: '', 
            country: '', 
            contact: '' 
        };

        if(!formData.email) {
            newErrors.email = 'please enter a valid email!!'
        }

        if(!formData.firstName) {
            newErrors.firstName = 'First-Name required!!'
        }

        if(!formData.lastName) {
            newErrors.lastName = 'Last-Name required!!'
        }

        if(!formData.homeAddress) {
            newErrors.homeAddress = 'Home-Adderess required!!'
        }
        
        if(!formData.town) {
            newErrors.town = 'Town required!!'
        }

        if(!formData.state) {
            newErrors.state = 'State required!!'
        }

        if(!formData.country) {
            newErrors.country = 'Country required!!'
        }

        if(!formData.contact || formData.contact.length < 11 || formData.contact.length > 11) {
            newErrors.contact = 'Contact most be 11 digit!!'
        }

        setError(newErrors);

        if(newErrors.email || newErrors.firstName || newErrors.lastName || newErrors.homeAddress || newErrors.town || newErrors.state || newErrors.country || newErrors.contact) return;

        try {
            const payload = {
                ...formData,
                email: formData.email.trim().toLowerCase(),
                contact: String(formData.contact).replace(/\D/g, '')
            };

            const response = await fetch(`${API_URL}/SignUp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                setServerError(data.message || data.error || "This email or phone number is already registered.");
                return;
            }

            console.log("Signup success:", data);
            localStorage.setItem("signupData", JSON.stringify(payload));
            navigate("/SignupPassword");
        } catch (error) {
            console.error("Signup error:", error);
            setServerError("We could not complete your signup. Please try again.");
        }
    }

    return (
        <div className="signUp">
            <div className="header">
                <img src={images} alt="Abrahamola Logo" />
                <h2>Welcome to Abrahamolas Gadgets</h2>
                <p>Enter your details to create an account with Abrahamolas Gadgets</p>
            </div>

            <section className="signupForm">
                <div className="columns">
                    <div className="column">
                        <form onSubmit={handleSubmit}>
                            <div className="cols">
                                <div className="col">
                                    <div className="formGroup">
                                        <label htmlFor="email">E-mail Address</label><br/>
                                        <input type="email" value={formData.email} onChange={handleChange} name="email" id="email" placeholder="Enter your E-mail Address" />
                                        {error.email && <p style={{ color: 'red', fontSize: '12px', fontWeight: 'bold', textAlign: 'left', position: 'relative', top: '10px'}}>{error.email}</p>}
                                    </div>

                                    <div className="formGroup">
                                        <label htmlFor="firstName">First Name</label><br/>
                                        <input type="text" value={formData.firstName} onChange={handleChange} name="firstName" id="firstName" placeholder="Enter your First Name" />
                                        {error.firstName && <p style={{ color: 'red', fontSize: '12px', fontWeight: 'bold', textAlign: 'left', position: 'relative', top: '10px'}}>{error.firstName}</p>}
                                    </div>

                                    <div className="formGroup">
                                        <label htmlFor="lastName">Last Name</label><br/>
                                        <input type="text" value={formData.lastName} onChange={handleChange}  name="lastName" id="lastName" placeholder="Enter your Last Name" />
                                        {error.lastName && <p style={{ color: 'red', fontSize: '12px', fontWeight: 'bold', textAlign: 'left', position: 'relative', top: '10px'}}>{error.lastName}</p>}
                                    </div>

                                    <div className="formGroup address">
                                        <label htmlFor="homeAddress">Home Address</label><br/>
                                        <input type="text" value={formData.homeAddress} onChange={handleChange} name="homeAddress" id="homeAddress" placeholder="Enter your home Address" />
                                        {error.homeAddress && <p style={{ color: 'red', fontSize: '12px', fontWeight: 'bold', textAlign: 'left', position: 'relative', top: '10px'}}>{error.homeAddress}</p>}
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="formGroup">
                                        <label htmlFor="Town/City">Town/ City</label><br/>
                                        <input type="text" value={formData.town} onChange={handleChange} name="town" id="town" placeholder="Enter your Town/ City of Residence" /> 
                                        {error.town && <p style={{ color: 'red', fontSize: '12px', fontWeight: 'bold', textAlign: 'left', position: 'relative', top: '10px'}}>{error.town}</p>}
                                    </div>

                                    <div className="formGroup">
                                        <label>State</label><br/>
                                        <input type="text" value={formData.state} onChange={handleChange} name="state" id="state" placeholder="Enter your State of Residence" />
                                        {error.state && <p style={{ color: 'red', fontSize: '12px', fontWeight: 'bold', textAlign: 'left', position: 'relative', top: '10px'}}>{error.state}</p>}
                                    </div>

                                    <div className="formGroup">
                                        <label htmlFor="country">Country</label><br/>
                                        <input type="text" value={formData.country} onChange={handleChange} name="country" id="country" placeholder="Enter your Country of Residence" />
                                        {error.country && <p style={{ color: 'red', fontSize: '12px', fontWeight: 'bold', textAlign: 'left', position: 'relative', top: '10px'}}>{error.country}</p>}
                                    </div>

                                    <div className="formGroup">
                                        <label htmlFor="contactNumber">Contact Number</label><br/>
                                        <input type="tel" value={formData.contact} onChange={handleChange}     name="contact" id="contact" placeholder="Enter your Contact Number" />
                                        {error.contact && <p style={{ color: 'red', fontSize: '12px', fontWeight: 'bold', textAlign: 'left', position: 'relative', top: '10px'}}>{error.contact}</p>}
                                    </div>
                                </div>
                            </div>
                                {serverError && <p className="form-server-error" role="alert">{serverError}</p>}
                            <button type="submit">Continue</button>
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default Signup