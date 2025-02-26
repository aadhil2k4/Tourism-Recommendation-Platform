import { useThemeStore } from "../store/useThemeStore";
import authImageLight from "../assets/authImageLight.png";
import authImageDark from "../assets/authImageDark.jpg";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VerifyEmailPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const { theme } = useThemeStore();
  const navigate = useNavigate();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    console.log("Verfication Code: ", verificationCode);
  }

  useEffect(()=>{
    if(code.every(digit=>digit!=="")){
      handleSubmit(new Event("submit"));
    }
  }, [code])

  return (
    <div className="h-screen grid lg:grid-cols-2">
      {/** Left Side Image */}
      <div className="w-full h-screen hidden lg:block">
        <div className="w-full h-full">
          {theme == "light" ? (
            <img
              src={authImageLight}
              alt="Auth Light"
              className="object-cover w-full h-full"
            />
          ) : (
            <img
              src={authImageDark}
              alt="Auth Dark"
              className="object-cover w-full h-full"
            />
          )}
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
                  className="w-12 h-12 text-center text-2xl font-medium rounded-lg input input-bordered"
                />
              ))}
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Verify Email
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
