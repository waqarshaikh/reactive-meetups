import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import FavouritesContext from "../../contexts/favourites-context";
import { useAuth } from "../../contexts/auth-contexts";
import css from "./MainNavigation.module.css";

const MainNavigation = (props) => {
  const favouritesContext = useContext(FavouritesContext);
  const { logout, currentUser } = useAuth();
  const [error, setError] = useState("");
  const history = useHistory();

  async function handleLogout(event) {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch (error) {
      setError("Failed to logout");
    }
  }

  return (
    <header>
      <Link to="/">
        <div className={css.logo}>
          Reactive <span className={css.meetups}>Meetups</span>
        </div>
      </Link>

      <nav>
        {currentUser && (
          <ul>
            <li>
              <Link to="/">All Meetups</Link>
            </li>
            <li>
              <Link to="/new-meetup">New Meetup</Link>
            </li>
            <li>
              <Link to="/favourites">
                Favourities
                <span className={css.badge}>
                  {favouritesContext.totalFavourites}
                </span>
              </Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/logout" onClick={handleLogout}>
                Log out
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default MainNavigation;
