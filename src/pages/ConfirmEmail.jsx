import React, { useState, useEffect } from 'react';
import authService from '../appwrite/auth';
import { useSearchParams } from 'react-router-dom';

function ConfirmEmail() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('...verifying');

  useEffect(() => {
    const userId = searchParams.get('userId');
    const secret = searchParams.get('secret');

    if (userId && secret) {
      authService
        .confirmVerification({ userId, secret })
        .then(() => {
          setStatus('✅ Email verified successfully!');
        })
        .catch((err) => {
          console.error(err);
          setStatus('❌ Verification failed. Link might be expired or invalid.');
        });
    } else {
      setStatus('❌ Invalid verification link.');
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow text-center">
        <h1 className="text-xl font-semibold">{status}</h1>
      </div>
    </div>
  );
}

export default ConfirmEmail;
