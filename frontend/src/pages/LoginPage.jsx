import { useState, useEffect } from "react";
import { Mail, Lock, EyeOff, Eye, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import googleLogo from "../assets/googleLogo.svg";
import { useAuthStore } from "../store/useAuthStore";
import ImageCarousel from "../components/ImageCarousel";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { isLoading, login, error } = useAuthStore();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    return () => {
      useAuthStore.setState({ error: null });
    };
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      {/** Left Side Image */}
      <div className="w-full h-screen hidden lg:block">
        <div className="w-full h-full">
          <ImageCarousel />
        </div>
      </div>
      {/** Right Side Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md spce-y-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
            <p className="text-base-content/60">Sign in to your account</p>
          </div>
          {/**SignIn Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-10"
                  placeholder="you@example.com"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10"
                  placeholder="••••••••"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/40" />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader className="animate-spin mx-auto" size={24} />
                  Loading...
                </>
              ): "Sign in"}
            </button>
          </form>
          <div className="flex justify-between items-center mt-4 text-base-content/60 text-sm">
            <p>
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="link link-primary">
                Create account
              </Link>
            </p>
            <Link to="/forgotPassword" className="link link-primary">
              Forgot Password
            </Link>
          </div>
        </div>
        <div className="text-center my-4">
          <p className="px-3 text-sm">OR</p>
          <div>
            <button className="flex items-center justify-center w-full border border-gray-300 rounded-lg py-3 px-4 font-medium mt-4">
              <img
                src={googleLogo}
                alt="Google logo"
                className="w-7 h-7 mr-4"
              />
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
