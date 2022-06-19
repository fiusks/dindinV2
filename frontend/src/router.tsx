import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/layout';
import Login from './components/login';


export default function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="login" />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}