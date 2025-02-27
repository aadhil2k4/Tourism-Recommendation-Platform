import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import ImageCarousel from "../components/ImageCarousel";

const VerifyEmailPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const { error, isLoading, verifyEmail } = useAuthStore();

  const handleKeyChange = (value, index) => {
    const newCode = [...code];
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    console.log(verificationCode);
    try {
      await verifyEmail(verificationCode);
      navigate("/");
      toast.success("Email verified Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

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
            <h1 className="text-2xl font-bold mt-2">Verify Your Email</h1>
            <p className="text-base-content/60">
              Enter the 6 digit code sent your email address
            </p>
          </div>
          {/**SignIn Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between">
              {code.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="6"
                  value={digit}
                  ref={(eL) => (inputRefs.current[index] = eL)}
                  onChange={(e) => handleKeyChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 text-center text-2xl rounded-lg input input-bordered"
                />
              ))}
            </div>
            {error && <p className='text-red-500 text-center font-semibold mt-2'>{error}</p>}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoading || code.some((digit) => !digit)}
            >
              {isLoading ? "Verifying.." : "Verify Email" }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
