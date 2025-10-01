import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

function Feed() {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(backendURL + "/me/name-username", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.msg === "no name username") {
          navigate("/me/profile");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Button
        className="m-5 cursor-pointer"
        variant={"outline"}
        onClick={() => {
          fetch(backendURL + "/auth/signout", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          })
          .then(()=>{navigate("/signin")})
          .catch((err)=>{console.log(err)})
        }}
      >
        Sign out
      </Button>

      <Button
        className="m-5 cursor-pointer"
        variant={"outline"}
        onClick={() => {
          navigate("/me/profile");
        }}
      >
        My profile
      </Button>
    </div>
  );
}

export default Feed;
