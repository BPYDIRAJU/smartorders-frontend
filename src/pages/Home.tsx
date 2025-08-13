// src/pages/Home.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";

const Home: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  if (auth.isLoading) return <p>Loading...</p>;
  if (!auth.isAuthenticated) {
    auth.signinRedirect(); // ✅ redirect to login
    return <p>Redirecting to login...</p>;
  }

  const goToSuppliers = (item: string) => {
    navigate(`/suppliers/${item}`);
  };

  const icons = [
    { name: "Iron", top: "150px", left: "400px" },
    { name: "Sand", top: "150px", right: "400px" },
    { name: "Bricks", center: true },
    { name: "Cement", bottom: "150px", left: "400px" },
    { name: "Wood", bottom: "150px", right: "400px" },
  ];

  return (
    <div
      style={{
        backgroundImage: `url("/assets/bg.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "calc(100vh - 64px)",
        width: "100vw",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "white",
          fontSize: "36px",
          textShadow: "2px 2px 4px black",
          marginTop: "100px",
          marginBottom: "400px",
        }}
      >
        Smart Orders Pro
      </h1>

      {icons.map((item) => (
        <div
          key={item.name}
          style={{
            position: "absolute",
            ...(item.center
              ? {
                  top: "54%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }
              : item),
            textAlign: "center",
            cursor: "pointer",
            transition: "all 0.3s ease-in-out",
          }}
          onClick={() => goToSuppliers(item.name.toLowerCase())}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
            e.currentTarget.style.boxShadow =
              "0 0 15px rgba(255, 255, 255, 0.8)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = item.center
              ? "translate(-50%, -50%) scale(1)"
              : "scale(1)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <img
            src={`/assets/${item.name.toLowerCase()}.png`}
            alt={item.name}
            width="64"
            height="64"
          />
          <div
            style={{
              color: "white",
              backgroundColor: "black",
              borderRadius: "6px",
              marginTop: "5px",
              padding: "2px 10px",
              fontWeight: "bold",
            }}
          >
            {item.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;

