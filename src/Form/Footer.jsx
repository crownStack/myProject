import React from "react";
import "../style/footer.css";

const Footer = () => {
    return (
        <>
            <footer>
                <div>
                    <ul>
                        <h2>Explore</h2>
                        <li>E-commerce</li>
                        <li>Repair Services</li>
                        <li>Insurance Services</li>
                    </ul>

                    <ul>
                        <h2>Help</h2>
                        <li>About Us</li>
                        <li>Terms & Conditions</li>
                        <li>Privancy Policy</li>
                        <li>Tech News</li>
                        <li>Live Chat</li>
                    </ul>

                    <ul>
                        <h2>Find Us</h2>
                        <li>Instagram</li>
                        <li>Contact No.</li>
                        <li>E-Mail Address</li>
                        <li>21, Kodesho street, beside juli<br /> pharmacy, ikeja, lagos.</li>
                    </ul>

                    <div className="subscribe">
                        <form action="GET">
                            <label>Subscribe to our News letter</label><br />
                            <input type="text" name="subscribeNews" id="subscribeNews" placeholder="Enter your E-mail Address" /><br/ >
                            <button type="submit">Subscribe</button>
                        </form>
                    </div>
                </div>
                <p className="reserved">2024 © Abrahamolas Gadgets. All rights reserved</p>
            </footer>
        </>
    )
}

export default Footer