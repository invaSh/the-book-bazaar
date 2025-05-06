import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getUserData } from '../utils/auth'; 
import { LogoTwo } from '../components/Logo'; 

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/sign-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { accessToken } = await response.json();
      localStorage.setItem('token', accessToken);

      const user = getUserData();

      if (user?.roles[0] === 'User') {
        toast.error('User does not exist!');
        localStorage.removeItem('token');
        return;
      }

      toast.success('Successfully logged in!');
      navigate('/admin');
    } catch (e) {
      console.error(e);
      toast.error('Login failed!');
    }
  };

  return (
    <>
      <title>Book Bazaar - Admin Sign In</title>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-richNavy/5 to-richNavy/10 p-4 font-admin-body">
        <div className="w-full max-w-md">
          <div className="bg-white p-8 rounded-xl shadow-subtle-lg border border-richNavy/10">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <LogoTwo />
              </div>

              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-richNavy to-richNavy/80 rounded-full flex items-center justify-center shadow-subtle-lg mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-creamParchment" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                  />
                </svg>
              </div>

              <h1 className="text-3xl font-semibold text-richNavy mb-2">Admin Portal</h1>
              <p className="text-mutedSlate">Sign in to access your dashboard</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-richNavy mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  className={`w-full px-4 py-3 border ${
                    errors.email ? 'border-paleRose' : 'border-richNavy/20'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-richNavy/30 focus:border-richNavy/50 text-richNavy placeholder-mutedSlate/50`}
                  placeholder="your@email.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-richNavy mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters',
                    },
                  })}
                  className={`w-full px-4 py-3 border ${
                    errors.password ? 'border-paleRose' : 'border-richNavy/20'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-richNavy/30 focus:border-richNavy/50 text-richNavy placeholder-mutedSlate/50`}
                  placeholder="••••••••"
                />
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    {...register('remember')}
                    className="h-4 w-4 text-richNavy focus:ring-richNavy border-richNavy/30 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-richNavy/80">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-richNavy/80 hover:text-richNavy transition-colors">
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-creamParchment bg-gradient-to-r from-richNavy to-richNavy/90 hover:from-richNavy/90 hover:to-richNavy transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-richNavy/50"
                >
                  Sign in
                  <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          <div className="mt-8 text-center text-sm text-richNavy/60">
            <p>© {new Date().getFullYear()} The Book Bazaar. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
