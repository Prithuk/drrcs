/**
 * Login Form Component
 * Handles user login with email and password validation
 */

import React, { useState } from 'react';
import { validateLoginForm, validateEmail } from '../../utils/validation';
import { useAuth } from '../../hooks/useAuth';
import './AuthForms.css';

const LoginForm = ({ onSuccess, onNavigateToRegister, onNavigateToForgotPassword }) => {
  const { login, loading } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [submittedError, setSubmittedError] = useState(null);

  /**
   * Handle input change
   */
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: inputValue,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }

    setSubmittedError(null);
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmittedError(null);

    // Validate form
    const validation = validateLoginForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    // Clear errors
    setErrors({});

    // Attempt login
    const result = await login(formData.email, formData.password, formData.rememberMe);

    if (!result.success) {
      setSubmittedError(result.message);
    } else {
      // Success - callback to parent component
      onSuccess?.();
    }
  };

  /**
   * Demo credentials helper
   */
  const handleUseDemoCredentials = (role = 'admin') => {
    const demoCredentials = {
      admin: {
        email: 'admin@drrcs.test',
        password: 'Admin@123456',
      },
      volunteer: {
        email: 'volunteer@drrcs.test',
        password: 'Volunteer@123',
      },
      organization: {
        email: 'org@drrcs.test',
        password: 'Organization@123',
      },
    };

    const creds = demoCredentials[role];
    setFormData({
      ...formData,
      email: creds.email,
      password: creds.password,
    });
  };

  return (
    <form className="auth-form login-form" onSubmit={handleSubmit}>
      <h2>Login to DRRCS</h2>
      <p className="form-subtitle">Disaster Relief Resource Coordination System</p>

      {submittedError && (
        <div className="alert alert-error" role="alert">
          {submittedError}
        </div>
      )}

      {/* Email Field */}
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          onBlur={() => {
            // Validate email on blur
            const validation = validateEmail(formData.email);
            if (!validation.isValid && formData.email) {
              setErrors((prev) => ({
                ...prev,
                email: validation.error,
              }));
            }
          }}
          placeholder="Enter your email"
          className={errors.email ? 'input-error' : ''}
          disabled={loading}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <span className="error-message" id="email-error">
            {errors.email}
          </span>
        )}
      </div>

      {/* Password Field */}
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Enter your password"
          className={errors.password ? 'input-error' : ''}
          disabled={loading}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? 'password-error' : undefined}
        />
        {errors.password && (
          <span className="error-message" id="password-error">
            {errors.password}
          </span>
        )}
      </div>

      {/* Remember Me Checkbox */}
      <div className="form-group checkbox">
        <input
          id="rememberMe"
          type="checkbox"
          name="rememberMe"
          checked={formData.rememberMe}
          onChange={handleInputChange}
          disabled={loading}
        />
        <label htmlFor="rememberMe">Remember me</label>
      </div>

      {/* Forgot Password Link */}
      <div className="form-links">
        <button
          type="button"
          className="link-secondary"
          onClick={onNavigateToForgotPassword}
          disabled={loading}
        >
          Forgot password?
        </button>
      </div>

      {/* Submit Button */}
      <button type="submit" className="button button-primary button-block" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>

      {/* Demo Credentials Helper */}
      <div className="demo-credentials">
        <p className="demo-label">Demo Accounts (for testing):</p>
        <div className="demo-buttons">
          <button
            type="button"
            className="button button-small button-secondary"
            onClick={() => handleUseDemoCredentials('admin')}
            disabled={loading}
          >
            Admin
          </button>
          <button
            type="button"
            className="button button-small button-secondary"
            onClick={() => handleUseDemoCredentials('volunteer')}
            disabled={loading}
          >
            Volunteer
          </button>
          <button
            type="button"
            className="button button-small button-secondary"
            onClick={() => handleUseDemoCredentials('organization')}
            disabled={loading}
          >
            Organization
          </button>
        </div>
      </div>

      {/* Sign Up Link */}
      <div className="auth-footer">
        <p>
          Don't have an account?{' '}
          <button
            type="button"
            className="link-button"
            onClick={onNavigateToRegister}
            disabled={loading}
          >
            Sign up here
          </button>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
