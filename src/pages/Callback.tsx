// src/pages/Callback.tsx
import React, { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";

const Callback: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      const idToken = auth.user?.id_token;
      const accessToken = auth.user?.access_token;

      if (!idToken) {
        console.error("❌ No ID token received");
        return;
      }
      if (!accessToken) {
        console.error("❌ No access token received");
        return;
      }

      console.log("✅ ID Token:", idToken);
      console.log("✅ Access Token:", accessToken);

      // Store both tokens in localStorage
      localStorage.setItem("id_token", idToken);
      localStorage.setItem("access_token", accessToken);

      // Redirect to homepage or wherever you want
      navigate("/");
    } else if (auth.error) {
      console.error("OIDC Login Error:", auth.error);
    }
  }, [auth, navigate]);

  return <p>Redirecting...</p>;
};

export default Callback;
