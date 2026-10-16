import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Phone, Lock, Shield, Zap } from 'lucide-react';
import axios from 'axios';
import { postData } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    mobile: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth();

  const from = location.state?.from?.pathname || '/dashboard';

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

    try {
      const data = await postData('/api/user/login', {
        mobile: formData.mobile,
        password: formData.password,
        isAdminLogin: true
      });

      if (data.success) {
        // Store tokens in localStorage
        localStorage.setItem('accessToken', data.data.accesstoken);
        localStorage.setItem('refreshToken', data.data.refreshToken);

        // Set axios default header
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.data.accesstoken}`;

        // Set user data from login response if available, otherwise fetch user details
        if (data.data.user) {
          setUser(data.data.user);
        } else {
          // Fetch user details from API
          try {
            const userResponse = await axios.get('/api/user/user-details', {
              headers: {
                Authorization: `Bearer ${data.data.accesstoken}`
              }
            });
            if (userResponse.data.success) {
              setUser(userResponse.data.data);
            }
          } catch (userError) {
            console.error('Error fetching user details:', userError);
          }
        }

        // Redirect to dashboard
        navigate(from, { replace: true });
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
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
          {/* Logo/Header Section */}
          <div className="login-header">
            <div className="logo-wrapper">
              <div className="logo-icon">
                <Shield className="h-7 w-7" />
              </div>
              <Zap className="h-5 w-5 spark-icon" />
            </div>
            <h2 className="login-title">Admin Portal</h2>
            <p className="login-subtitle">Welcome back! Please sign in to continue.</p>
          </div>

          {/* Login Form */}
          <form className="login-form" onSubmit={handleSubmit}>
            {error && (
              <div className="error-message">
                <span>{error}</span>
              </div>
            )}

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
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="glass-input"
                  placeholder="Enter your password"
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

            <div className="form-footer">
              <Link to="/forgot-password" className="forgot-link">
                Forgot your password?
              </Link>
            </div>

            <div className="register-link">
              <span>Don't have an account? </span>
              <Link to="/register" className="register-link-a">
                Sign Up
              </Link>
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
                  <span>Sign In</span>
                  <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="login-footer">
            <p>Secure Admin Access</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
