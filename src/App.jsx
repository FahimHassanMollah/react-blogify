import { Routes, Route } from 'react-router-dom';
import PrivateRoutes from './routes/PrivateRoutes';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Layout from './components/common/Layout';
import Blog from './components/blog/Blog';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import BlogCreatePage from './pages/BlogCreatePage';

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<PrivateRoutes />}>
          <Route element={<ProfilePage />} path="/profile/:profileId" exact />
          <Route element={<BlogCreatePage />} path="/blog/create" exact />
        </Route>
        {/* public routes  */}
        <Route element={<HomePage />} path="/" exact />
        <Route element={<Blog />} path="/blog/:blogId" exact />
        <Route element={<LoginPage />} path="/login" exact />
        <Route element={<RegisterPage />} path="/register" exact />
      </Route>
      <Route element={<NotFoundPage />} path="*" />
    </Routes>
  )
}

export default App



const NotFoundPage = () => {
  return (
    <div>
      <h1>404</h1>
    </div>
  )
}

