import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

const LoginPage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted!");
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}> {/* Adjusted for centering */}
        <div className="card" style={{ minWidth: "300px" }}> {/* Example styling to ensure minimum width */}
            <div className="card-body">
                <h3 className="card-title text-center text-secondary">Welcome Back!</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="text-secondary mb-1" htmlFor="emailInput">Email address</label>
                        <input type="email" className="form-control" id="emailInput" aria-describedby="emailHelp" placeholder="janedoe@example.com" required />
                    </div>
                    <div className="form-group mt-2">
                        <label className="text-secondary mb-1" htmlFor="passwordInput">Password</label>
                        <input type="password" className="form-control" id="passwordInput" placeholder="Enter Password" required />
                    </div>
                    <div className="d-flex justify-content-center">
                        <a href="login.html" className="text-primary">Forgot your password?</a>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mt-3">Log In</button>
                    <div className="d-flex justify-content-center align-items-center mt-2">
                        <p className="text-secondary">Need an account?</p>&nbsp;<a href="signup.html" className="text-primary">Register</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
};

export default LoginPage;
