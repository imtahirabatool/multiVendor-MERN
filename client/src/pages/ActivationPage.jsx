import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          console.log("Sending activation token:", { activation_token }); // Log the request payload
          const res = await axios.post(`${server}/user/activation`, {
            activation_token,
          });
          console.log(res.data.message);
          setSuccess(true);
        } catch (error) {
          console.error("Error response:", error.response); // Log the entire error response
          setError(true);
        }
      };
      activationEmail();
    }
  }, [activation_token]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <p>Your token is expired!</p>
      ) : success ? (
        <p>Your account has been created successfully!</p>
      ) : (
        <p>Activating your account...</p>
      )}
    </div>
  );
};

export default ActivationPage;
