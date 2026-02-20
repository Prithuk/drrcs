import React, { useState } from 'react';
import { validateRegistrationForm, validatePassword, validateEmail } from '../../utils/validation';
import { useAuth } from '../../hooks/useAuth';
import './AuthForms.css';

const PasswordStrengthIndicator = ({ strength }) => {
  if (!strength) return null;

  const strengthLevels = {
    weak: { label: 'Weak', color: '#dc3545' },
    medium: { label: 'Medium', color: '#ffc107' },
    strong: { label: 'Strong', color: '#28a745' },
  };

  const level = strengthLevels[strength] || strengthLevels.weak;

  return (
    <div className="password-strength">
      <div className="strength-bar">
        <div className={`strength-indicator strength-${strength}`} style={{ backgroundColor: level.color }} />
      </div>
      <span className="strength-label" style={{ color: level.color }}>
        Strength: {level.label}
      </span>
    </div>
  );
};

const RegisterForm = ({ onSuccess, onNavigateToLogin }) => {
  const { register, loading } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [submittedError, setSubmittedError] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(null);

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

    // Calculate password strength when password changes
    if (name === 'password' && value) {
      const validation = validatePassword(value);
      setPasswordStrength(validation.strength);
    }

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
    const validation = validateRegistrationForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    // Clear errors
    setErrors({});

    // Attempt registration
    const result = await register(formData.fullName, formData.email, formData.password, formData.role);

    if (!result.success) {
      setSubmittedError(result.message);
    } else {
      // Success - callback to parent component
      onSuccess?.();
    }
  };

  return (
    <form className="auth-form register-form" onSubmit={handleSubmit}>
      <h2>Create Your Account</h2>
      <p className="form-subtitle">Join the Disaster Relief Resource Coordination System</p>

      {submittedError && (
        <div className="alert alert-error" role="alert">
          {submittedError}
        </div>
      )}

      {/* Full Name Field */}
      <div className="form-group">
        <label htmlFor="fullName">Full Name *</label>
        <input
          id="fullName"
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          placeholder="Enter your full name"
          className={errors.fullName ? 'input-error' : ''}
          disabled={loading}
          aria-invalid={!!errors.fullName}
          aria-describedby={errors.fullName ? 'fullName-error' : undefined}
        />
        {errors.fullName && (
          <span className="error-message" id="fullName-error">
            {errors.fullName}
          </span>
        )}
      </div>

      {/* Email Field */}
      <div className="form-group">
        <label htmlFor="email">Email Address *</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          onBlur={() => {
            // Validate email format on blur
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
        <label htmlFor="password">Password *</label>
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Create a strong password"
          className={errors.password ? 'input-error' : ''}
          disabled={loading}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? 'password-error' : 'password-requirements'}
        />
        {passwordStrength && !errors.password && (
          <PasswordStrengthIndicator strength={passwordStrength} />
        )}
        {errors.password && (
          <span className="error-message" id="password-error">
            {errors.password}
          </span>
        )}
        {!errors.password && (
          <small id="password-requirements" className="form-help">
            Password must contain: 8+ characters, uppercase, lowercase, number, special character
          </small>
        )}
      </div>

      {/* Confirm Password Field */}
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password *</label>
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          placeholder="Re-enter your password"
          className={errors.confirmPassword ? 'input-error' : ''}
          disabled={loading}
          aria-invalid={!!errors.confirmPassword}
          aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
        />
        {errors.confirmPassword && (
          <span className="error-message" id="confirmPassword-error">
            {errors.confirmPassword}
          </span>
        )}
      </div>

      {/* Role Selection */}
      <div className="form-group">
        <label htmlFor="role">Role *</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          className={errors.role ? 'input-error' : ''}
          disabled={loading}
          aria-invalid={!!errors.role}
          aria-describedby={errors.role ? 'role-error' : undefined}
        >
          <option value="">-- Select your role --</option>
          <option value="volunteer">Volunteer</option>
          <option value="organization_staff">Organization Staff</option>
          <option value="admin">Administrator (Request Invite)</option>
        </select>
        {errors.role && (
          <span className="error-message" id="role-error">
            {errors.role}
          </span>
        )}
      </div>

      {/* Terms & Conditions Checkbox */}
      <div className="form-group checkbox">
        <input
          id="termsAccepted"
          type="checkbox"
          name="termsAccepted"
          checked={formData.termsAccepted}
          onChange={handleInputChange}
          disabled={loading}
          aria-invalid={!!errors.termsAccepted}
          aria-describedby={errors.termsAccepted ? 'terms-error' : undefined}
        />
        <label htmlFor="termsAccepted">
          I accept the <a href="#terms">Terms and Conditions</a> *
        </label>
        {errors.termsAccepted && (
          <span className="error-message" id="terms-error">
            {errors.termsAccepted}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button type="submit" className="button button-primary button-block" disabled={loading}>
        {loading ? 'Creating Account...' : 'Create Account'}
      </button>

      {/* Login Link */}
      <div className="auth-footer">
        <p>
          Already have an account?{' '}
          <button
            type="button"
            className="link-button"
            onClick={onNavigateToLogin}
            disabled={loading}
          >
            Log in here
          </button>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
