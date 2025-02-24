import React from 'react';
import Button from '../components/Button';
import { useForm } from 'react-hook-form';
import { useAuth } from 'react-oidc-context';

function SignIn() {
  const { register, handleSubmit, formState: { errors }, } = useForm();

  const auth = useAuth();

  const onSubmit = (data) => {
    auth.signinRedirect();
  };

  return (
    <section className="flex min-h-screen h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gradient-to-r from-amber-100 via-orange-100 to-red-100">
      <div className="mx-auto w-full max-w-5xl rounded-lg shadow-xl bg-white transition-all flex flex-col md:flex-row">
        <div className="md:w-1/2 md:pr-8 overflow-hidden hidden md:block">
          <img
            src="/src/assets/images/loginimage.jpg"
            alt="Login Image"
            className="w-full h-full object-cover rounded-tl-lg rounded-bl-lg"
          />
        </div>
        <div className="md:w-1/2 px-4 py-8 md:pr-12 flex flex-col justify-center items-center md:items-start">
          <div className="flex mt-6 flex-col items-center gap-5">
            <h2 className="text-3xl font-bold tracking-tight text-gray-800">
              Welcome back!
            </h2>

            <h4 className="tracking-tight text-gray-600">
              Please enter your credentials...
            </h4>
          </div>
          <div className="mt-8 w-full">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    placeholder={`Your email here...`}
                    className="block w-full rounded-md h-10 border-gray-300 shadow-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 px-3 sm:text-sm transition-all duration-300 focus:outline-none bg-gray-50/50"
                    {...register('email', {
                      required: 'Please provide an email!',
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 italic">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="text-xs sm:text-sm text-orange-500 hover:text-orange-600 transition-all duration-300"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    name={`password`}
                    type={`password`}
                    placeholder={`********`}
                    className="block w-full rounded-md h-10 border-gray-300 shadow-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 px-3 sm:text-sm transition-all duration-300 focus:outline-none bg-gray-50/50"
                    {...register('password', {
                      required: 'Please provide a password',
                    })}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1 italic">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Button
                  name={`Sign in`}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                />
              </div>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500">
              Don't have an account?
              <a
                href="#"
                className="mx-2 font-medium text-orange-500 hover:text-orange-600 transition-all duration-300"
              >
                Sign up here!
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignIn;
