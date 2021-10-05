import MainNavigation from "./MainNavigation";
import css from "./Layout.module.css";
import { AuthProvider } from "../../contexts/auth-contexts";

const Layout = (props) => {
  return (
    <AuthProvider>
      <div>
        <MainNavigation />
        <main className={css.main}>{props.children}</main>
      </div>
    </AuthProvider>
  );
};

export default Layout;
