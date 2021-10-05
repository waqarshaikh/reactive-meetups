import React, { useRef, useState } from "react";
import styles from "./Signup.module.css";
import { useAuth } from "../../contexts/auth-contexts";
import { Link, useHistory } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";

const Signup = (props) => {
  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, updateName, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError(`Passwords don't match`);
    }

    setError("");
    setLoading(true);

    signup(emailRef.current.value, passwordRef.current.value)
      .then((result) => {
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {
            // Profile updated!
            // ...
          })
          .catch((error) => {
            // An error occurred
            console.log(`updateProfile error: ${error}`);
          });
      })
      .catch((err) => {
        console.log(`signup error: ${err}`);
        setError(`Failed to create an account`);
      });

    // try {
    //   setError("");
    //   setLoading(true);
    //   signup(emailRef.current.value, passwordRef.current.value);
    //   await updateName(nameRef.current.value);
    //   history.push("/");
    // } catch (error) {
    //   setError(`Failed to create an account`);
    // }
    // setLoading(false);
  }

  return (
    <div className={styles.signup}>
      <div className={styles.heading}>
        <span>Sign Up</span>{" "}
      </div>
      <div className={styles.card}>
        {error && (
          <span class={`${styles.alert} ${styles.danger}`}>{error}</span>
        )}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.control}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              required
              ref={nameRef}
              value={name}
              name="name"
              onChange={event => setName(event.target.value)}
              id="name"
            />
          </div>

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

          <div className={styles.control}>
            <label htmlFor="password-confirm">Confirm Password</label>
            <input
              type="password"
              required
              ref={passwordConfirmRef}
              name="password-confirm"
              id="password-confirm"
            />
          </div>

          <div className={styles.actions}>
            <button disabled={loading} type="submit">
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </div>
          <div className={styles.card_footer}>
            <div>
              Already have an account? <Link to="/login">Log in</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
