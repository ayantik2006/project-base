import { useNavigate } from "react-router-dom";

function Feed() {
  const backendURL = "https://project-base-backend.onrender.com";
  const navigate = useNavigate();

  return (
    <div>
      <button
      className="w-[5rem] h-[2rem] bg-black text-white"
        onClick={() => {
          fetch(backendURL+"/auth/signout",{
            method:"POST",
            credentials:"include",
            headers:{"Content-Type":"application/json"}
          })
          .then(()=>{
            navigate("/signin");
          })
          .catch((err)=>{console.log(err)})
        }}
      >
        Sign out
      </button>
    </div>
  );
}

export default Feed;
