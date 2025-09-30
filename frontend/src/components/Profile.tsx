import defaultAvatar from "../assets/default avatar.jpg";
import { SquarePen } from "lucide-react";
import { User } from "lucide-react";
import { Info } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { Upload } from "lucide-react";
import { Trash } from "lucide-react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { CircleX } from "lucide-react";

function Profile() {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [name, setName] = useState("John Doe");
  const [username, setUsername] = useState("johndoe");
  const [intro, setIntro] = useState("Profile introduction");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
  const usernameInput = useRef(null);

  useEffect(() => {
    fetch(backendURL + "/me/profile", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        setName(res.name === "" ? "John Doe" : res.name);
        setUsername(res.username === "" ? "johndoe" : res.username);
        setIntro(res.intro === "" ? "Profile introduction" : res.intro);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center">
      <div className="max-w-2xl w-2xl h-fit shadow-[0_0_10px_#cbd1cc] rounded-2xl my-5 mx-[0.5rem] p-5">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
          {/* {avator+name+username} */}
          <img
            src={defaultAvatar}
            alt="defaultAvatar"
            className="w-23 rounded-full border-4 border-[#7ac655]"
          />
          <div className="flex flex-col">
            <h2 className="font-bold text-[1.3rem] text-center sm:text-left flex items-center justify-center sm:justify-start gap-1">
              <User className="w-4" />
              {name}
            </h2>
            <a className="cursor-pointer text-gray-500 text-center sm:text-left">
              @{username}
            </a>
            <p className="text-gray-500 text-center sm:text-left inline-flex gap-1 line-clamp-3">
              <TooltipPrimitive.Provider>
                <TooltipPrimitive.Root>
                  <TooltipPrimitive.Trigger asChild>
                    <Info className="w-4 cursor-pointer" />
                  </TooltipPrimitive.Trigger>

                  <TooltipPrimitive.Content
                    side="right"
                    align="center"
                    sideOffset={4}
                    className="shadow-[0_0_6px_gray] text-[0.9rem] border border-gray-300 bg-white text-gray-900 px-3 py-2 rounded-lg"
                  >
                    <p>{intro}</p>
                    {/* Arrow removed */}
                  </TooltipPrimitive.Content>
                </TooltipPrimitive.Root>
              </TooltipPrimitive.Provider>
              {intro.slice(0, 14) + "..."}
            </p>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <button className="bg-[#7ac655] p-2 rounded-lg font-semibold text-white cursor-pointer hover:bg-[#66a447] duration-300 flex gap-1">
                <SquarePen className="w-5" />
                Edit Profile
              </button>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-2">
              <form className="flex flex-col gap-2">
                <label htmlFor="name">Name</label>
                <Input
                  type="name"
                  placeholder="Name"
                  required
                  className="selection:bg-[#085fd2]"
                  id="name"
                  defaultValue={name}
                />
                <label htmlFor="username">Username</label>
                <Input
                  type="username"
                  placeholder="Username"
                  required
                  id="username"
                  className="selection:bg-[#085fd2]"
                  defaultValue={username}
                  ref={usernameInput}
                  onInput={() => {
                    setUsername(usernameInput.current.value)
                    fetch(backendURL + "/me/username-available", {
                      method: "POST",
                      credentials: "include",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        username:usernameInput.current.value
                      }),
                    })
                    .then((res)=>res.json())
                    .then((res)=>{
                      if(res.msg==="yes"){
                        setIsUsernameAvailable(true);
                      }
                      else if(res.msg==="no"){
                        setIsUsernameAvailable(false);
                      }
                    })
                    .catch((err)=>{console.log(err)})
                  }}
                />
                {(username === "johndoe" || !isUsernameAvailable) && (
                  <Alert className="p-1 border-none">
                    <AlertDescription className="flex items-center text-red-700 font-semibold text-[0.8rem]">
                      <CircleX className="w-4" />
                      Username unavailable!
                    </AlertDescription>
                  </Alert>
                )}
                <label htmlFor="intro">Profile introduction</label>
                <Input
                  type="intro"
                  placeholder="Profile introduction"
                  required
                  id="intro"
                  className="selection:bg-[#085fd2]"
                />
                <div className="flex justify-center items-center gap-2">
                  <Button
                    type="button"
                    className="cursor-pointer w-fit h-[1.5rem] p-1 px-2 py-3 text-[0.9rem] bg-transparent border-1 hover:bg-gray-100"
                  >
                    <label
                      htmlFor="avatar-img"
                      className="flex items-center gap-1 cursor-pointer text-[0.87rem] text-black ml-1"
                    >
                      <Upload className="w-[0.95rem]" />
                      Upload profile
                    </label>
                  </Button>
                  <Input
                    type="file"
                    placeholder="Profile introduction"
                    required
                    className="hidden"
                    accept=".jpg,.png"
                    id="avatar-img"
                  />
                  <Button
                    variant="outline"
                    className="cursor-pointer w-fit h-[1.5rem] p-2 text-[0.9rem] hover:bg-red-600 hover:text-white py-3"
                    type="button"
                  >
                    Remove profile
                  </Button>
                </div>
                <Button
                  variant="outline"
                  className="cursor-pointer w-fit hover:bg-[#66a447] hover:text-white"
                  type="submit"
                >
                  <Save />
                  Save
                </Button>
              </form>
            </PopoverContent>
          </Popover>
        </div>
        <hr className="mt-4 mx-10 border-t-1 border-gray-200" />
        <div className="flex flex-wrap mx-10 justify-center">
          <div className="h-18 w-27 flex flex-col justify-center items-center hover:scale-[1.1] duration-500 cursor-pointer">
            <p className="text-gray-500 font-semibold">Followers</p>
            <p className="text-[#73d244] text-[1.3rem] font-bold">150</p>
          </div>
          <div className="h-18 w-27 flex flex-col justify-center items-center hover:scale-[1.1] duration-500 cursor-pointer">
            <p className="text-gray-500 font-semibold">Following</p>
            <p className="text-[#73d244] text-[1.3rem] font-bold">100</p>
          </div>
          <div className="h-18 w-27 flex flex-col justify-center items-center hover:scale-[1.1] duration-500 cursor-pointer">
            <p className="text-gray-500 font-semibold">Posts</p>
            <p className="text-[#73d244] text-[1.3rem] font-bold">20</p>
          </div>
          <div className="h-18 w-27 flex flex-col justify-center items-center hover:scale-[1.1] duration-500 cursor-pointer">
            <p className="text-gray-500 font-semibold">Projects</p>
            <p className="text-[#73d244] text-[1.3rem] font-bold">5</p>
          </div>
          <div className="h-18 w-27 flex flex-col justify-center items-center hover:scale-[1.1] duration-500 cursor-pointer">
            <p className="text-gray-500 font-semibold">Joined</p>
            <p className="text-[#222322] text-[1.3rem] font-bold">Dec 2024</p>
          </div>
        </div>
        <hr className="mx-10 border-t-1 border-gray-200" />
      </div>
    </div>
  );
}

export default Profile;
