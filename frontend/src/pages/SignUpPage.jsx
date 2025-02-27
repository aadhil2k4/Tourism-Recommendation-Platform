import { useState, useEffect } from "react";
import authImageLight from "../assets/authImageLight.png";
import { Mail, Lock, EyeOff, Eye, UserRound, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import googleLogo from "../assets/googleLogo.svg";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState();
  const navigate = useNavigate();
  const { error, signup, isLoading } = useAuthStore();

  const validateForm = () => {
    if (!formData.name.trim()) return toast.error("Full Name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    return true;
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if(!success) return;
    try {
      const response = await signup(formData);
      if(response?.status === "success"){
          navigate("/verifyEmail");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      {/** Left Side Image */}
      <div className="w-full h-screen hidden lg:block">
        <div className="w-full h-full">
          <img
            src={authImageLight}
            alt="Auth Light"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      {/** Right Side Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md spce-y-8">
          <div className="text-center mb-4 mt-11">
            <h1 className="text-2xl font-bold mt-2">Create Account</h1>
            <p className="text-base-content/60">
              Get Started with your free account
            </p>
          </div>
          {/**SignIn Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserRound className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-10"
                  placeholder="John Doe"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  value={formData.name}
                />
              </div>
            </div>
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
                  value={formData.email}
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
                  value={formData.password}
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
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                <Loader className="animate-spin mx-auto" size={24} />
                Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
          <p className="text-center mt-4 text-base-content/60 text-md">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary">
              Sign in
            </Link>
          </p>
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

export default SignUpPage;
