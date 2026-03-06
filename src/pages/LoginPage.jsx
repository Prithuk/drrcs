import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import './AuthPages.css';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    console.log('Login successful!');
    navigate('/dashboard');
  };

  const handleNavigateToRegister = () => {
    navigate('/register');
  };

  const handleNavigateToForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="auth-page login-page">
      <div className="auth-page-content">
        <div className="auth-container">
          <LoginForm 
            onSuccess={handleLoginSuccess} 
            onNavigateToRegister={handleNavigateToRegister}
            onNavigateToForgotPassword={handleNavigateToForgotPassword}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
