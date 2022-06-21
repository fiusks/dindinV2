import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import TransactionList from './features/Transactions/TransactionList';
import SignIn from './features/User/signIn';
import SignUp from './features/User/signUp';
import PrivateRoute from './helpers/PrivateRoute';
import Home from './features/Home';

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
            <PrivateRoute
              redirectPath="/signIn"
              children={<TransactionList />}
            />
          }
        />
      </Route>
    </Routes>
  );
}
