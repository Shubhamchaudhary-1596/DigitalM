import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Phone, Lock, User, Shield, Zap, ArrowLeft } from 'lucide-react';
import { postData } from '../utils/api';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validation
    if (!formData.name || !formData.mobile || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const data = await postData('/api/user/register', {
        name: formData.name,
        mobile: formData.mobile,
        password: formData.password
      });

      if (data.sucess || data.success) {
        setSuccess('Registration successful! Redirecting to login...');
        // Store tokens if provided
        if (data.data?.accesstoken) {
          localStorage.setItem('accessToken', data.data.accesstoken);
          localStorage.setItem('refreshToken', data.data.refreshToken);
        }
        // Redirect to login after a short delay
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError(err.message || 'Network error. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="login-page">
      {/* Animated background orbs */}
      <div className="bg-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="grid-overlay"></div>

      <div className="login-container">
        <div className="glass-card">
          {/* Back to Login Link */}
          <div className="back-link">
            <Link to="/login" className="back-link-a">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Login</span>
            </Link>
          </div>

          {/* Logo/Header Section */}
          <div className="login-header">
            <div className="logo-wrapper">
              <div className="logo-icon">
                <Shield className="h-7 w-7" />
              </div>
              <Zap className="h-5 w-5 spark-icon" />
            </div>
            <h2 className="login-title">Admin Registration</h2>
            <p className="login-subtitle">Create your admin account to continue.</p>
          </div>

          {/* Registration Form */}
          <form className="login-form" onSubmit={handleSubmit}>
            {error && (
              <div className="error-message">
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="success-message">
                <span>{success}</span>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name</label>
              <div className="input-wrapper">
                <div className="input-icon">
                  <User className="h-5 w-5" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="glass-input"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="mobile" className="form-label">Mobile Number</label>
              <div className="input-wrapper">
                <div className="input-icon">
                  <Phone className="h-5 w-5" />
                </div>
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={formData.mobile}
                  onChange={handleChange}
                  className="glass-input"
                  placeholder="Enter your mobile number"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-wrapper">
                <div className="input-icon">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="glass-input"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <div className="input-wrapper">
                <div className="input-icon">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="glass-input"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="submit-btn"
            >
              {loading ? (
                <span className="loading-spinner"></span>
              ) : (
                <>
                  <span>Create Account</span>
                  <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="login-footer">
            <p>Secure Admin Registration</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

