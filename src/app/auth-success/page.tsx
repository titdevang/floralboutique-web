"use client";

import { Suspense } from "react";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Loader from "../components/ui/loader/loader";

function GoogleCallback() {
  const params = useSearchParams();

  useEffect(() => {
    const token = params.get("token");
    const name = params.get("name");

    if (window.opener) {
      window.opener.postMessage(
        {
          type: "GoogleAuth",
          token,
          name,
        },
        "*"
      );

      setTimeout(() => {
        window.close();
      }, 250);
    }
  }, []);

return (
  <div
    style={{
      height: "100vh",
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #ece9e6, #ffffff)",
      animation: "fadeIn 0.8s ease",
    }}
  >
    <div className="pulse-loader">
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
    </div>

    <h2
      style={{
        marginTop: "20px",
        fontSize: "20px",
        fontWeight: "600",
        color: "#4A4A4A",
        letterSpacing: "0.5px",
        animation: "textFade 1.2s infinite alternate ease-in-out",
      }}
    >
      Signing you in...
    </h2>

    <style>{`
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      .pulse-loader {
        display: flex;
        gap: 12px;
      }

      .pulse-loader .circle {
        width: 14px;
        height: 14px;
        background-color: #671945;
        border-radius: 50%;
        animation: pulse 0.6s infinite alternate;
      }

      .pulse-loader .circle:nth-child(2) {
        animation-delay: 0.15s;
      }

      .pulse-loader .circle:nth-child(3) {
        animation-delay: 0.3s;
      }

      @keyframes pulse {
        from { transform: scale(0.65); opacity: 0.6; }
        to { transform: scale(1.2); opacity: 1; }
      }

      @keyframes textFade {
        from { opacity: 0.5; }
        to { opacity: 1; }
      }
    `}</style>
  </div>
);

}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "18px",
            fontWeight: "500",
          }}
        >
          <div className="loader"></div>
          <span style={{ marginLeft: "10px" }}><Loader/></span>

          <style>{`
            .loader {
              width: 20px;
              height: 20px;
              border: 3px solid #ddd;
              border-top-color: #4A90E2;
              border-radius: 50%;
              animation: spin 0.8s linear infinite;
            }
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      }
    >
      <GoogleCallback />
    </Suspense>
  );
}
