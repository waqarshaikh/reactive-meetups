import React, { useRef, useState } from "react";
import styles from "../components/auth/Signup.module.css";
import { useAuth } from "../contexts/auth-contexts";
import { Link, useHistory } from "react-router-dom";

const Profile = (props) => {
  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, changePassword, changeEmail, updateName } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError(`Passwords don't match`);
    }

    const promises = [];
    setError("");
    setLoading(true);

    if (emailRef.current.value !== currentUser.email) {
      promises.push(changeEmail(emailRef.current.value));
    }

    if (nameRef.current.value !== currentUser.displayName) {
      promises.push(updateName(nameRef.current.value));
    }

    if (passwordRef.current.value) {
      promises.push(changePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        setMessage("Profile successfully updated");
      })
      .catch(() => {
        setError(`Failed to update profile`);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className={styles.signup}>
      <div className={styles.heading}>
        <span>Profile</span>{" "}
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
              defaultValue={currentUser.displayName}
              name="name"
              id="name"
            />
          </div>

          <div className={styles.control}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              required
              ref={emailRef}
              defaultValue={currentUser.email}
              name="email"
              id="email"
            />
          </div>

          <div className={styles.control}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Leave blank to keep the same"
              ref={passwordRef}
              name="password"
              id="password"
            />
          </div>

          <div className={styles.control}>
            <label htmlFor="password-confirm">Confirm Password</label>
            <input
              type="password"
              placeholder="Leave blank to keep the same"
              ref={passwordConfirmRef}
              name="password-confirm"
              id="password-confirm"
            />
          </div>

          <div className={styles.actions}>
            <button disabled={loading} type="submit">
              {loading ? "Updating profile..." : "Update"}
            </button>
          </div>
          <div className={styles.card_footer}>
            <div>
              <Link to="/">Cancel</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
