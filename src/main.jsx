import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from "react-router-dom";
import BlogProvider from './providers/BlogProvider.jsx';
import AuthProvider from './providers/AuthProvider.jsx';
import ProfileProvider from './providers/ProfileProvider.jsx';
import ScrollToTop from './routes/ScrollToTop.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <AuthProvider>
      <BlogProvider>
        <ProfileProvider>
          <Router>
          <ScrollToTop />
            <App />
          </Router>
        </ProfileProvider>
      </BlogProvider>
    </AuthProvider>

  // </React.StrictMode>,
)
