import { BrowserRouter, Route, Switch } from "react-router-dom";
import AllMeetups from "./pages/AllMeetup";
import Favourites from "./pages/Favourites";
import NewMeetup from "./pages/NewMeetup";
import Layout from "./components/layout/Layout";
import { FavouriteContextProvider } from "./contexts/favourites-context";
import { AuthProvider } from "./contexts/auth-contexts";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import { AuthRoute, UnauthRoute } from "./PrivateRoute";
import ForgotPassword from "./components/auth/ForgotPassword";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <FavouriteContextProvider>
          <Layout>
            <Switch>
              <AuthRoute exact path="/" component={AllMeetups} />
              <AuthRoute path="/profile" component={Profile} />
              <UnauthRoute path="/signup" component={Signup} />
              <UnauthRoute path="/login" component={Login} />
              <UnauthRoute path="/forgot-password" component={ForgotPassword} />
              <AuthRoute path="/new-meetup" component={NewMeetup} />
              <AuthRoute path="/favourites" component={Favourites} />
            </Switch>
          </Layout>
        </FavouriteContextProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
