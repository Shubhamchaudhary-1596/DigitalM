import React from 'react';
import { Link } from 'react-router-dom';
import { LockKeyhole } from 'lucide-react';

const ForgotPassword = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
    <div className="max-w-md w-full bg-white rounded-2xl border p-8 text-center">
      <LockKeyhole size={36} className="mx-auto text-teal-700 mb-5"/>
      <h1 className="text-2xl font-bold text-gray-900 mb-3">Password reset is not enabled</h1>
      <p className="text-gray-600 mb-6">For security, self-service password reset is unavailable until a verified reset-token and email workflow is configured. Contact the site administrator to regain access.</p>
      <Link to="/login" className="inline-flex bg-teal-700 text-white rounded-lg px-5 py-3 font-semibold">Back to login</Link>
    </div>
  </div>
);

export default ForgotPassword;
