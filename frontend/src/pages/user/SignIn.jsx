import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { Mail, Lock, Eye, EyeOff, BookOpen } from 'lucide-react';
import toast from 'react-hot-toast';

function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const onSubmit = async (data) => {

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/sign-in`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json()

      login(result.accessToken);
      toast.success('Successfully logged in!');
      navigate('/');
    } catch (e) {
      console.error(e);
      toast.error('Login failed!');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-creamParchment px-4 sm:px-6 py-10 sm:py-16">
      <div className="w-full flex flex-col lg:flex-row max-w-4xl rounded-lg mx-auto">
        <div className="w-full lg:w-1/2 flex items-center justify-center p-5 sm:p-8 bg-white shadow-md rounded-lg lg:rounded-r-none">
          <div className="w-full max-w-xs sm:max-w-sm mx-auto">
            <div className="text-center mb-5 sm:mb-6">
              <BookOpen className="mx-auto text-[#8B5E3C] w-9 h-9 sm:w-12 sm:h-12 mb-3" />
              <h1 className="font-serif text-xl sm:text-2xl text-gray-900 mb-3 sm:mb-4 leading-tight">
                Welcome Back to <br />
                <span className="text-[#8B5E3C]">The Book Bazaar</span>
              </h1>
              <div className="w-14 sm:w-16 h-1 bg-lightBlue mx-auto mt-2 rounded-full"></div>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-3 sm:space-y-5 font-body"
            >
              {/* Email */}
              <div className="relative">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mutedSlate w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full pl-10 sm:pl-12 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-softTaupe bg-white shadow-sm focus:ring-2 focus:ring-lightBlue/50 focus:border-lightBlue outline-none transition-all"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs sm:text-sm text-red-600 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="relative">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mutedSlate w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Your Password"
                    className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2 text-xs sm:text-sm rounded-lg border border-softTaupe bg-white shadow-sm focus:ring-2 focus:ring-lightBlue/50 focus:border-lightBlue outline-none transition-all"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-mutedSlate hover:text-lightBlue transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs sm:text-sm text-red-600 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <div className="flex text-center">
                <button
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#8B5E3C] to-[#B38B6D] hover:from-[#8B5E3C]/90 hover:to-[#B38B6D]/90 text-white font-medium py-2 text-xs sm:text-sm rounded-lg shadow-subtle hover:shadow-subtle-lg transition-all"
                  type="submit"
                >
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
              </div>
            </form>

            <p className="text-center text-mutedSlate mt-4 sm:mt-5 text-xs sm:text-sm font-body">
              New here?{' '}
              <a
                href="/signup"
                className="text-lightBlue hover:text-richNavy underline hover:no-underline transition-colors"
              >
                Create an account
              </a>
            </p>
          </div>
        </div>

        {/* Image Section */}
        <div className="hidden lg:block lg:w-1/2 relative min-h-[40vh] lg:min-h-[70vh] rounded-lg lg:rounded-l-none overflow-hidden">
          <img
            src="https://img.freepik.com/free-photo/stack-books-with-hardcovers_23-2147846040.jpg"
            alt="Stacked books"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-richNavy/30 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}

export default SignInPage;
