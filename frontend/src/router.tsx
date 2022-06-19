import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/layout';
import SignIn from './components/signIn';
import SignUp from './components/signUp';

export default function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="signUp" />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="signIn" element={<SignIn />} />
      </Route>
    </Routes>
  );
}
