import { useState } from "react";
import "../style/Login.css";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

   const [errors, setErrors] = useState({});

    const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    if (isSignup && !form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!form.email.includes("@")) {
      newErrors.email = "Enter valid email";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Min 6 characters required";
    }

    return newErrors;
  };

   const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      alert(isSignup ? "Signup Successful 🚀" : "Login Successful 🔐");

      setForm({
        name: "",
        email: "",
        password: "",
      });
    }
  };

   return (
    <div className="login-container">

      <div className="form-box">
        <h2>{isSignup ? "Create Account" : "Login"}</h2>

        <form onSubmit={handleSubmit}>

          {/* NAME (Signup only) */}
          {isSignup && (
            <div className="input-group">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>
          )}

          {/* EMAIL */}
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>