import React from 'react';
import "./ForgotPassword.css"

const ForgotPassword = () => {
    return (
        <div>
            <h2>Sign Up</h2>
            <form>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default ForgotPassword;