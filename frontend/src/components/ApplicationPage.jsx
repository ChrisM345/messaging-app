import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ApplicationPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/", {
        state: { error: "You must login." },
      });
      return;
    }

    fetch("http://localhost:8000/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Invalid token");
        return res.json();
      })
      .then((data) => {
        console.log("DATA IS HERE");
        console.log(data.user);
        setUser(data.user);
      })
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/", {
          state: { error: "Invalid Token. Please login again." },
        });
      });
  }, []);

  return (
    <>
      {!localStorage.getItem("token") ? (
        <h1>LOADING</h1>
      ) : (
        <h1>You are now logged in {localStorage.getItem("username")}</h1>
      )}
    </>
  );
};

export default ApplicationPage;
