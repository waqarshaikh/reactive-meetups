import React, { useRef, useState } from "react";
import div from "../ui/Card";
import styles from "./Signup.module.css";
import { useAuth } from "../../contexts/auth-contexts";
import { Link, useHistory } from "react-router-dom";

const Login = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (error) {
      setError(`Failed to Sign in`);
    }
    setLoading(false);
  }

  return (
    <div className={styles.signup}>
      <div className={styles.heading}><span>Log In</span> </div>
      <div className={styles.card}>
        {error && (
          <span class={`${styles.alert} ${styles.danger}`}>{error}</span>
        )}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.control}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              required
              ref={emailRef}
              name="email"
              id="email"
            />
          </div>

          <div className={styles.control}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              required
              ref={passwordRef}
              name="password"
              id="password"
            />
          </div>
          <div className={styles.actions}>
            <button disabled={loading} type="submit">
              {loading ? "Logging up..." : "Log in"}
            </button>
          </div>
          <div className={styles.card_footer}>
            <div>
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
            <div>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
