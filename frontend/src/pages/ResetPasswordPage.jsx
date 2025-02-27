import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { useNavigate, useParams } from "react-router-dom";
import { Lock, Loader } from "lucide-react";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { resetPassword, error, isLoading, message } = useAuthStore();

  const { token } = useParams();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password!==confirmPassword){
        toast.error("Passwords do not match");
        return;
    }
    try {
        await resetPassword(token,password);
    toast.success("Password reset successfully, redirecting to Login Page...");
    setTimeout(()=>{
        navigate("/login");
    }, 2000);
    } catch (error) {
        console.log(error);
        toast.error(error.message || "Error resetting Password");
    }
  };

  return (
    <div className="h-screen p-20 text-center mx-auto">
      <div className="w-full max-w-md p-6 rounded-lg mx-auto shadow-lg border-2">
      <h1 className="text-2xl font-bold mt-2 mb-4">Reset Password</h1>
      {error && <p className="text-red-500 text-md mb-4">{error}</p>}
      {message && <p className="text-green-500 text-md mb-4">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-base-content/40" />
          </div>
          <input
            type="password"
            className="input input-bordered w-full pl-10"
            placeholder="New Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="relative mt-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-base-content/40" />
          </div>
          <input
            type="password"
            className="input input-bordered w-full pl-10"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="mt-6 btn btn-primary w-full max-w-md">{isLoading ? (
                <>
                  <Loader className="animate-spin mx-auto" size={24} />
                  Loading...
                </>
              ) : (
                "Set Password"
              )}</button>
      </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
