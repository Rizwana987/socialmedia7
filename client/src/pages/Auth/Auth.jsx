import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { logIn, signUp } from "../../actions/AuthActions.js"; // Import both logIn and signUp
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API calls

const Auth = () => {
  const initialState = {
    firstname: "",
    lastname: "",
    username: "",
    email: "", // Add email to the initial state
    password: "",
    confirmpass: "",
    country: "",
    interests: [],
  };

  const loading = useSelector((state) => state.authReducer.loading);
  const error = useSelector((state) => state.authReducer.error); // Access error from state
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false); // Toggle for signup or login
  const [data, setData] = useState(initialState);
  const [confirmPass, setConfirmPass] = useState(true);
  const [emailExists, setEmailExists] = useState(false); // State to manage email existence

  // Reset Form
  const resetForm = () => {
    setData(initialState);
    setConfirmPass(true);
    setEmailExists(false); // Reset email existence state
  };

  // Handle change in input fields
  const handleChange = (e) => {
    if (e.target.name === "interests") {
      const value = e.target.value;
      setData((prevData) => {
        const interests = prevData.interests.includes(value)
          ? prevData.interests.filter((interest) => interest !== value)
          : [...prevData.interests, value];
        return { ...prevData, interests };
      });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  // Validate Username
  const validateUsername = (username) => {
    const usernamePattern = /^[A-Z][a-z]*$/; // Starts with uppercase, followed by lowercase
    if (!usernamePattern.test(username) || username.length < 8 || /\d/.test(username)) {
      alert("Username must start with an uppercase letter, have at least 8 characters, and not contain numbers.");
      return false;
    }
    return true;
  };

  // Validate Password
  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/; // At least 6 characters, contains uppercase, lowercase, digit, and special character
    if (!passwordPattern.test(password)) {
      alert("Password must be at least 6 characters long and contain uppercase, lowercase, digits, and special characters.");
      return false;
    }
    return true;
  };

  // Check if the email already exists
  const checkEmailExists = async (email) => {
    try {
      const response = await axios.get(`/api/check-email?email=${email}`); // Replace with your actual endpoint
      return response.data.exists; // Assuming the API returns { exists: true/false }
    } catch (error) {
      console.error("Error checking email:", error);
      return false; // In case of error, assume email does not exist
    }
  };

  // Form Submission
  const handleSubmit = async (e) => {
    setConfirmPass(true);
    e.preventDefault();

    // Validate inputs for signup
    if (isSignUp) {
      const isUsernameValid = validateUsername(data.username);
      const isPasswordValid = validatePassword(data.password);

      if (!isUsernameValid || !isPasswordValid) return;

      // Check if the email already exists
      const emailExists = await checkEmailExists(data.email);
      setEmailExists(emailExists); // Update the email existence state

      if (emailExists) {
        alert("Email is already registered.");
        return;
      }

      if (data.password === data.confirmpass) {
        dispatch(signUp(data, navigate));
      } else {
        setConfirmPass(false);
        alert("Confirm password does not match.");
      }
    } else {
      // Login flow
      dispatch(logIn(data, navigate));
    }
  };

  // Check if there's an error during login
  if (error && !isSignUp) {
    alert("Invalid username or password. Please try again.");
  }

  return (
    <div className="Auth">
      {/* left side */}
      <div className="a-left">
        <img src={Logo} alt="logo" />
        <div className="Webname">
          <h1>Soul Sink</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>

      {/* right form side */}
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Register" : "Login"}</h3>

          {isSignUp && (
            <div>
              {/* Signup fields */}
              <input
                required
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                value={data.firstname}
                onChange={handleChange}
              />
              <input
                required
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                value={data.lastname}
                onChange={handleChange}
              />
              {/* Email field */}
              <input
                required
                type="email"
                placeholder="Email"
                className="infoInput"
                name="email"
                value={data.email}
                onChange={handleChange}
              />
            </div>
          )}

          <div>
            {/* Username field for both login and signup */}
            <input
              required
              type="text"
              placeholder="Username"
              className="infoInput"
              name="username"
              value={data.username}
              onChange={handleChange}
            />
          </div>

          <div>
            {/* Password field for both login and signup */}
            <input
              required
              type="password"
              className="infoInput"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
            {isSignUp && (
              <input
                required
                type="password"
                className="infoInput"
                name="confirmpass"
                placeholder="Confirm Password"
                value={data.confirmpass}
                onChange={handleChange}
              />
            )}
          </div>

          {isSignUp && (
            <>
              {/* Country Selection */}
              <div>
                <select
                  name="country"
                  className="infoInput"
                  value={data.country}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a country</option>
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>

              {/* Interests Checkboxes */}
              <div>
                <h4>Select your interests:</h4>
                <label>
                  <input
                    type="checkbox"
                    value="Technology"
                    name="interests"
                    checked={data.interests.includes("Technology")}
                    onChange={handleChange}
                  />
                  Technology
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="Sports"
                    name="interests"
                    checked={data.interests.includes("Sports")}
                    onChange={handleChange}
                  />
                  Sports
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="Music"
                    name="interests"
                    checked={data.interests.includes("Music")}
                    onChange={handleChange}
                  />
                  Music
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="Travel"
                    name="interests"
                    checked={data.interests.includes("Travel")}
                    onChange={handleChange}
                  />
                  Travel
                </label>
              </div>
            </>
          )}

          {/* Validation for confirm password */}
          {!confirmPass && alert("Confirm password does not match")}

          <div>
            <span
              style={{
                fontSize: "12px",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => {
                resetForm();
                setIsSignUp((prev) => !prev);
              }}
            >
              {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
            </span>
            <button className="button infoButton" type="submit" disabled={loading}>
              {loading ? "Loading..." : isSignUp ? "Sign Up" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
