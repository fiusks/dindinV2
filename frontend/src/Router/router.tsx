import { Route, Routes } from 'react-router-dom';
import Layout from '../components/layout';
import SignIn from '../features/User/signIn';
import SignUp from '../features/User/signUp';
import PrivateRoute from '../helpers/PrivateRoute';
import Home from '../features/Home';
import Transactions from '../features/Transactions/transactions';

export default function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="signIn" element={<SignIn />} />
        <Route
          path="transactions"
          element={
            <PrivateRoute redirectPath="/signIn" children={<Transactions />} />
          }
        />
      </Route>
    </Routes>
  );
}
