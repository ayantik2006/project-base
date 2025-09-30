import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Feed() {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  useEffect(()=>{
    fetch(backendURL+"/me/name-username",{
      method:"POST",
      credentials:"include",
      headers:{"Content-Type":"application/json"}
    })
    .then((res)=>res.json())
    .then((res)=>{
      if(res.msg==="no name username"){
        navigate("/me/profile");
      }
    })
    .catch((err)=>{console.log(err);})
  },[]); 
   
  return (
    <div>
    </div>
  );
}

export default Feed;
