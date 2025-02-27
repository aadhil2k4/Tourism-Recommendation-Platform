import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { ArrowLeft, Mail, Loader } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { isLoading, forgotPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmitted(true);
  };

  return (
    <div className="h-screen pt-20 text-center mx-auto">
      <div className="w-full max-w-md p-6 rounded-lg mx-auto shadow-lg border-2">
        <h1 className="text-2xl font-bold mt-2">Forgot Password</h1>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <p className="text-base-content/60 mt-4 mb-4">
              Enter Your Email Address
            </p>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-base-content/40" />
              </div>
              <input
                type="email"
                className="input input-bordered pl-10 w-full max-w-md"
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="mt-6 btn btn-primary w-full max-w-md"
            >
              {isLoading ? (
                <>
                  <Loader className="animate-spin mx-auto" size={24} />
                  Loading...
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>
        ) : (
          <div className="text-center">
            <Mail className="h-10 w-10 mx-auto mt-4 border-2 p-1 rounded-lg" />
            <p className="text-base-content/60 mt-4 mb-4">
              If an account exists for {email}, you will receive a password
              reset link shortly
            </p>
          </div>
        )}
        <div className="flex justify-center px-8 mt-8">
          <Link
            to={"/login"}
            className="text-sm hover:underline flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
