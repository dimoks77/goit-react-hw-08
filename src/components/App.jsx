import { useEffect, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./Layout";
import { RestrictedRoute } from "./RestrictedRoute";
import { PrivateRoute } from "./PrivateRoute";
import { refreshUser } from "../redux/auth/operations";
import { selectIsRefreshing } from "../redux/auth/selectors";

// import { fetchContacts } from '../redux/contactsOps';
// import ContactForm from "./ContactForm/ContactForm";
// import ContactList from "./ContactList/ContactList";
// import SearchBox from "./SearchBox/SearchBox";

import ContactsPage from "../pages/ContactsPage/ContactsPage"

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage/RegisterPage"));
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
// const ContactsPage = lazy(() => import('../pages/ContactsPage/ContactsPage'));

const App = () => {
  // const dispatch = useDispatch();
  // const { loading, error } = useSelector(state => state.contacts)

  // useEffect(() => {
  //     dispatch(fetchContacts());
  // }, [dispatch]);

  const dispatch = useDispatch();
  const { isRefreshing } = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RestrictedRoute redirectTo="/contacts" component={<RegisterPage />} />} />
        <Route path="/login" element={<RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />} />
        <Route path="/contacts" element={ <PrivateRoute redirectTo="/login" component={<ContactsPage />} /> }/>
      </Routes>
    </Layout>
  );
};

export default App;

{
  /* <h1>PhoneBook</h1>
            <ContactForm />
            <SearchBox />
            <ContactList /> */
}
