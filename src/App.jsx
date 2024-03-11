import { Routes, Route } from 'react-router-dom';
import PrivateRoutes from './routes/PrivateRoutes';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Layout from './components/common/Layout';
import Blog from './components/blog/Blog';
import ProfilePage from './pages/ProfilePage';

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<PrivateRoutes />}>
          <Route element={<ProfilePage />} path="/profile" exact />
        </Route>
        {/* public routes  */}
        <Route element={<HomePage />} path="/" exact />
        <Route element={<Blog />} path="/blog/:blogId" exact />
        <Route element={<LoginPage />} path="/login" exact />
      </Route>

      {/*
    <Route element={<RegistrationPage />} path="/register" />
    <Route element={<NotFoundPage />} path="*" /> */}
    </Routes>
  )
}

export default App