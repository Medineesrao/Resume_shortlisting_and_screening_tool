"use client";
import { useState } from "react";
import "./auth.css";

const Auth = ({ page }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    newPassword: "",
    reEnterNewPassword: "",
    keepLoggedIn: false,
  });

  const [errors, setErrors] = useState({});
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState("");

  // Validate individual fields
  const validateField = (name, value) => {
    let error = "";

    if (name === "fullName" && page === "signup" && value.trim().length < 3) {
      error = "Full Name must be at least 3 characters.";
    }

    if (name === "email" && !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      error = "Enter a valid email address.";
    }

    if (name === "mobile" && page === "signup") {
      if (!value.match(/^\d{10}$/)) {
        error = "Enter a valid 10-digit mobile number.";
      } else if (value.startsWith("0")) {
        error = "Mobile number cannot start with 0.";
      }
    }

    if (name === "password" && (page === "signup" || page === "signin" || page === "reset-password") && value.length < 6) {
      error = "Password must be at least 6 characters.";
    }

    if (name === "confirmPassword" && page === "signup" && value !== formData.password) {
      error = "Passwords do not match.";
    }

    if (name === "newPassword" && page === "reset-password" && value.length < 6) {
      error = "New Password must be at least 6 characters.";
    }

    if (name === "reEnterNewPassword" && page === "reset-password" && value !== formData.newPassword) {
      error = "Passwords do not match.";
    }

    return error;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear the error when the user starts typing
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  // Handle blur event
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    let formValid = true;
    let newErrors = {};

    // Validate all fields before submitting
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        formValid = false;
      }
    });

    setErrors(newErrors);

    if (formValid) {
      console.log("Form submitted:", formData);
      if (page === "forgot-password") {
        setForgotPasswordMessage("If this email exists, you will receive a password reset link.");
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>
        {page === "signup" && "Sign Up"}
        {page === "signin" && "Sign In"}
        {page === "forgot-password" && "Forgot Password?"}
        {page === "reset-password" && "Reset Password"}
      </h2>

      {/* Description Text */}
      {page === "signin" && <p className="info-text">Please login to continue to your account.</p>}
      {page === "forgot-password" && <p className="info-text">Please enter your registered email ID.</p>}

      <form onSubmit={handleSubmit}>
        {/* Sign Up Page */}
        {page === "signup" && (
          <>
            <div className="input-container">
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} onBlur={handleBlur} placeholder="Full Name" required />
              <label>Full Name</label>
              {errors.fullName && <p className="error">{errors.fullName}</p>}
            </div>

            <div className="input-container">
              <input type="email" name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} placeholder="Email" required />
              <label>Email</label>
              {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <div className="input-container">
              <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} onBlur={handleBlur} placeholder="Mobile" required />
              <label>Mobile</label>
              {errors.mobile && <p className="error">{errors.mobile}</p>}
            </div>

            <div className="input-container">
              <input type="password" name="password" value={formData.password} onChange={handleChange} onBlur={handleBlur} placeholder="Create Password" required />
              <label>Create Password</label>
              {errors.password && <p className="error">{errors.password}</p>}
            </div>

            <div className="input-container">
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} onBlur={handleBlur} placeholder="Confirm Password" required />
              <label>Confirm Password</label>
              {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
            </div>

            <button type="submit">Sign Up</button>
          </>
        )}

        {/* Sign In Page */}
        {page === "signin" && (
  <>
    <div className="input-container">
      <label>Email</label>
      <input 
        type="email" 
        name="email" 
        value={formData.email} 
        onChange={handleChange} 
        onBlur={handleBlur} 
        placeholder="Email" 
        required 
      />
      {errors.email && <p className="error">{errors.email}</p>}
    </div>

    <div className="input-container">
      <label>Password</label>
      <input 
        type="password" 
        name="password" 
        value={formData.password} 
        onChange={handleChange} 
        onBlur={handleBlur} 
        placeholder="Password" 
        required 
      />
      {errors.password && <p className="error">{errors.password}</p>}
    </div>

    {/* Keep me logged in Checkbox */}
    <div className="checkbox-container">
      <input 
        type="checkbox" 
        name="keepLoggedIn" 
        checked={formData.keepLoggedIn} 
        onChange={handleChange} 
      />
      <label>Keep me logged in</label>
    </div>

    <button type="submit" className="signin-button">Sign in</button>

    {/* Links for Create Account & Forgot Password */}
    <p>
      Need an account? <a href="/signup">Create one</a>
    </p>
    <p>
      Forgot Password? <a href="/forgot-password">Reset</a>
    </p>
  </>
)}


        {/* Forgot Password Page */}
        {page === "forgot-password" && (
          <>
            <div className="input-container">
              <input type="email" name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} placeholder="Email" required />
              <label>Email</label>
              {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <button type="submit">Submit</button>
            {forgotPasswordMessage && <p className="success">{forgotPasswordMessage}</p>}
          </>
        )}

        {/* Reset Password Page */}
        {page === "reset-password" && (
          <>
            <div className="input-container">
              <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} onBlur={handleBlur} placeholder="New Password" required />
              <label>New Password</label>
              {errors.newPassword && <p className="error">{errors.newPassword}</p>}
            </div>

            <div className="input-container">
              <input type="password" name="reEnterNewPassword" value={formData.reEnterNewPassword} onChange={handleChange} onBlur={handleBlur} placeholder="Re-enter New Password" required />
              <label>Re-enter New Password</label>
              {errors.reEnterNewPassword && <p className="error">{errors.reEnterNewPassword}</p>}
            </div>

            <button type="submit">Reset Password</button>
          </>
        )}
      </form>
    </div>
  );
};

export default Auth;
