import React from "react";

const Footer = () => {
    return (
        <>
            <footer className="homeFooter">
                <div>
                    <section className="footer-column">
                        <h2>Explore</h2>
                        <ul>
                            <li>E-commerce</li>
                            <li>Repair Services</li>
                            <li>Insurance Services</li>
                        </ul>
                    </section>

                    <section className="footer-column">
                        <h2>Help</h2>
                        <ul>
                            <li>About Us</li>
                            <li>Terms & Conditions</li>
                            <li>Privancy Policy</li>
                            <li>Tech News</li>
                            <li>Live Chat</li>
                        </ul>
                    </section>

                    <section className="footer-column">
                        <h2>Find Us</h2>
                        <ul>
                            <li><i className="fa-brands fa-instagram"></i>Instagram</li>
                            <li><i className="fa-solid fa-phone"></i>Contact No.</li>
                            <li><i className="fa-solid fa-envelope"></i>E-Mail Address</li>
                            <li><i className="fa-solid fa-location-dot"></i>21, Kodesho street, beside juli<br /> pharmacy, ikeja, lagos.</li>
                        </ul>
                    </section>

                    <div className="subscribe">
                        <form action="GET">
                            <label>Subscribe to our News letter</label><br />
                            <input type="text" name="subscribeNews" id="subscribeNews" placeholder="Enter your E-mail Address" /><br/ >
                            <button type="submit">Subscribe<i className="fa-solid fa-bell"></i></button>
                        </form>
                    </div>
                </div>
                <p className="reserved">2024 © Abrahamolas Gadgets. All rights reserved</p>
            </footer>
        </>
    )
}

export default Footer