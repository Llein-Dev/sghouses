// components/GoogleLoginButton.js
import { GoogleLogin } from "@react-oauth/google";

export default function GoogleLoginButton({ onLoginSuccess, onLoginError }) {
  return (
    <GoogleLogin
      className="social-button google-button flex items-center p-2 text-sm border-[#28a745] rounded-lg bg-white text-[#28a745]"
      onSuccess={onLoginSuccess}
      onError={onLoginError}
      useOneTap
    />
  );
}
