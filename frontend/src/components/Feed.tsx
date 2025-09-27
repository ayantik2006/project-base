import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Feed() {
  const navigate = useNavigate();
  const location = useLocation();
  const backendURL = "https://project-base-backend.onrender.com";

  useEffect(() => {
      fetch(backendURL + "/auth/user", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.msg === "logged out") {
            navigate("/signin");
          } else if (res.msg !== "logged out") {
            navigate("/feed");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, [navigate, location.pathname]);
  
  return (
    <div>Feed</div>
  )
}

export default Feed