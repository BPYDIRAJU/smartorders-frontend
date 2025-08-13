// src/routes/PrivateRoute.tsx
import { useAuth } from "react-oidc-context";
import React from "react";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();

  if (auth.isLoading) {
    return <div>🔐 Checking authentication…</div>;
  }

  if (!auth.isAuthenticated) {
    auth.signinRedirect(); // ⬅️ THIS triggers Cognito login
    return <div>🔁 Redirecting to login…</div>;
  }

  return <>{children}</>;
};

export default PrivateRoute;

