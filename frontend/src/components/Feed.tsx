import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Feed() {
  const navigate = useNavigate();
  const location = useLocation();
  const backendURL = "https://project-base-backend.onrender.com";
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch(backendURL + "/auth/user", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.msg === "logged out") {
          setIsLoggedIn(false);
          navigate("/signin");
        } else if (res.msg !== "logged out") {
          setIsLoggedIn(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate, location.pathname]);

  if (isLoggedIn) return <div>Feed</div>;
}

export default Feed;
