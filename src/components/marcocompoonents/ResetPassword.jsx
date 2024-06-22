import { useState } from 'react';
import HeaderLogo from "../microcomponents/HeaderLogo";
import { Input } from "../microcomponents/textComponents";
import { Button3 } from "../microcomponents/RoundedButton";
import { auth } from '../../firebase/config';
import { sendPasswordResetEmail } from 'firebase/auth';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [resetRequested, setResetRequested] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // New state for loading

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true); // Set loading state

    try {
      await sendPasswordResetEmail(auth,email);
      setResetRequested(true);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error sending reset password email:', error);
      const message = error.message || 'An error occurred. Please try again.';
      setError(message);
    } finally {
      setLoading(false); // Clear loading state after request completes
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <HeaderLogo head="Forgot Password" />
        <form className="flex flex-col w-[300px] m-auto pt-[20px] md:w-[450px]" onSubmit={handleResetPassword}>
          <Input
            label="Enter recovery email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="w-full pt-5">
            <Button3
              text={loading ? 'Sending...' : 'Get reset code'} // Change button text during loading
              bg='bg-blue text-white'
              type="submit"
              disabled={loading} 
              onClick={handleResetPassword}
              // Disable button while loading
            />
          </div>
        </form>
        {resetRequested && (
          <p className="mt-3 text-green-600">Reset password instructions sent to {email}. Check your email.</p>
        )}
        {error && (
          <p className="mt-3 text-red-600">{error}</p>
        )}
      </div>
    </>
  );
}
