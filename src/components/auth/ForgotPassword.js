import React, { useRef, useState } from "react";
import styles from "./Signup.module.css";
import Card from '../ui/Card'
import { useAuth } from "../../contexts/auth-contexts";
import { Link } from "react-router-dom";

const ForgotPassword = (props) => {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setMessage("")
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Password Reset link has been sent to your email account. Check your inbox for further instruction");

    } catch (error) {
      setError(`Failed to Reset Password`);
    }
    setLoading(false);
  }

  return (
    <div className={styles.signup}>
      <div className={styles.heading}><span>Password Reset</span> </div>
      <Card>
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
          <div className={styles.actions}>
            <button disabled={loading} type="submit">
              {loading ? "Submiting..." : "Submit"}
            </button>
          </div>
          <div className={styles.card_footer}>
            <div>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </div>
          </div>
        </form>
      </Card>
      {error && (
          <div class={`${styles.alert} ${styles.danger}`}>{error}</div>
        )}
        {message && (
          <div class={`${styles.alert} ${styles.success}`}>{message}</div>
        )}
    </div>
  );
};

export default ForgotPassword;
