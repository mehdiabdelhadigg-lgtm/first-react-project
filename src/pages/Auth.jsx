import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate  } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export default function Auth() {
  const [mode, setmode] = useState("signup");
  const [message, setmessage] = useState(null);
  const { signUp, user, login } = useAuth();
  const navigate =useNavigate();
  const{
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  function onSubmit(data) {
    setmessage(null);
    let result;
    if (mode === "signup") {
      result = signUp(data.email, data.password);
    } else {
      result = login(data.email, data.password);
    }
    result.success ? navigate("/") : setmessage(result.message);
  }

  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
          <h1>{mode === "signup" ? "Sign Up" : "Login"}</h1>
          {user && (
            <div className="welcome-message">Welcome, {user.email}!</div>
          )}

          <form
            action=""
            className="auth-form"
            onSubmit={handleSubmit(onSubmit)}
          >
            {message && <div className="error-message">{message}</div>}

            <div className="form-group">
              <label className="form-lable" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                className="form-input"
                id="email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <span className="form-error">{errors.email.message}</span>
              )}
            </div>
            <div className="form-group">
              <label className="form-lable" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                className="form-input"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <span className="form-error">{errors.password.message}</span>
              )}
            </div>
            <button type="submit" className="btn btn-primary btn-large">
              {mode === "signup" ? "Sign Up" : "Login"}
            </button>
            <div className="auth-swich">
              {mode === "signup" ? (
                <p>
                  Already have an account?{" "}
                  <span className="auth-link " onClick={() => setmode("login")}>
                    Login
                  </span>
                </p>
              ) : (
                <p>
                  Don't have an account?{" "}
                  <span
                    className="auth-link "
                    onClick={() => setmode("signup")}
                  >
                    Sign Up
                  </span>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
