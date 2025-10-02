// Copyright 2025 Ayantik Sarkar
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// See the LICENSE file in the project root for license information.
// SPDX-License-Identifier: Apache-2.0

import defaultAvatar from "../assets/default avatar.jpg";
import { BadgeInfo, BookOpenText, Code, Plus, SquarePen } from "lucide-react";
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
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { CircleX } from "lucide-react";
import toast from "react-hot-toast";
import { Circles } from "react-loader-spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "./ui/textarea";

function Profile() {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [name, setName] = useState("John Doe");
  const [username, setUsername] = useState("johndoe");
  const [finalUsername, setFinalUsername] = useState("johndoe");
  const [avatarLink, setAvatarLink] = useState(defaultAvatar);
  const [intro, setIntro] = useState("Profile introduction");
  const [dateJoined, setDateJoined] = useState("");
  const [followersNum, setFollowersNum] = useState(0);
  const [followingNum, setFollowingNum] = useState(0);
  const [postsNum, setPostsNum] = useState(0);
  const [projectsNum, setProjectsNum] = useState(0);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
  const [isProfileSaving, setIsProfileSaving] = useState(false);
  const usernameInput = useRef(null);
  const nameInput = useRef(null);
  const introInput = useRef(null);
  const avatarInput = useRef(null);
  const avatarImg = useRef(null);
  const aboutSaveBtn = useRef(null);
  const aboutInput = useRef(null);
  const [aboutValue, setAboutValue] = useState("");

  useEffect(() => {
    fetch(backendURL + "/me/profile", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        setName(res.name === "" ? "John Doe" : res.name);
        setFinalUsername(res.username === "johndoe" ? "johndoe" : res.username);
        setUsername(res.username === "johndoe" ? "johndoe" : res.username);
        setIntro(res.intro === "" ? "Profile introduction" : res.intro);
        setAvatarLink(res.avatarLink === "" ? defaultAvatar : res.avatarLink);
        setDateJoined(res.joined.split(",")[0]);
        setFollowersNum(res.followersNum);
        setFollowingNum(res.followingNum);
        setPostsNum(res.postsNum);
        setProjectsNum(res.projectsNum);
        setAboutValue(res.about);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [backendURL]);

  return (
    <div className="w-screen h-screen flex justify-center">
      <div className="max-w-2xl w-2xl h-fit shadow-[0_0_10px_#cbd1cc] rounded-2xl my-5 mx-[0.5rem] p-5 flex flex-col justify-center items-center">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
          {/* {avator+name+username} */}
          <div className="flex flex-col items-center gap-1">
            <img
              src={avatarLink}
              alt="defaultAvatar"
              ref={avatarImg}
              className="w-23 rounded-full border-4 border-[#7ac655]"
            />
            <Button
              variant="outline"
              className="cursor-pointer w-fit h-[1.5rem] p-2 text-[0.9rem] hover:bg-red-600 hover:text-white py-3"
              type="button"
              onClick={() => {
                avatarImg.current.src = defaultAvatar;
                fetch(backendURL + "/me/delete-profile-picture", {
                  method: "POST",
                  credentials: "include",
                  headers: { "Content-Type": "application/json" },
                })
                  .then((res) => res.json())
                  .then((res) => {})
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              Remove picture
            </Button>
          </div>

          <div className="flex flex-col">
            <h2 className="font-bold text-[1.2rem] text-center sm:text-left flex items-center justify-center sm:justify-start gap-1">
              <User className="w-4" />
              {name}
            </h2>
            <a className="cursor-pointer text-gray-500 text-center sm:text-left">
              @{finalUsername}
            </a>
            <div className="text-gray-500 text-center sm:text-left inline-flex gap-1 line-clamp-3">
              <Popover>
                <PopoverTrigger>
                  <Info className="w-4 cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent
                  side="bottom"
                  align="start"
                  className="p-2 w-80 mx-8"
                >
                  {intro}
                </PopoverContent>
              </Popover>
              {intro.slice(0, 14) + "..."}
            </div>
          </div>
          <Popover
            onOpenChange={(e) => {
              if (e.valueOf() === false) {
                fetch(backendURL + "/me/profile", {
                  method: "POST",
                  credentials: "include",
                  headers: { "Content-Type": "application/json" },
                })
                  .then((res) => res.json())
                  .then((res) => {
                    if (res.avatarLink !== "") setAvatarLink(res.avatarLink);
                    else setAvatarLink(defaultAvatar);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } else {
                fetch(backendURL + "/me/username-available", {
                  method: "POST",
                  credentials: "include",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    username: username,
                  }),
                })
                  .then((res) => res.json())
                  .then((res) => {
                    if (res.msg === "yes") {
                      setIsUsernameAvailable(true);
                    } else if (res.msg === "no") {
                      setIsUsernameAvailable(false);
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            }}
          >
            <PopoverTrigger asChild>
              <button className="bg-[#7ac655] p-2 rounded-lg font-semibold text-white cursor-pointer hover:bg-[#66a447] duration-300 flex gap-1">
                <SquarePen className="w-5" />
                Edit Profile
              </button>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-2">
              <form
                className="flex flex-col gap-2"
                encType="multipart/form-data"
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsProfileSaving(true);
                  const formData = new FormData();
                  formData.append("name", nameInput.current.value);
                  formData.append("username", usernameInput.current.value);
                  formData.append("intro", introInput.current.value);
                  formData.append("avatar-img", avatarInput.current.files[0]);

                  fetch(backendURL + "/me/edit-profile", {
                    method: "POST",
                    credentials: "include",
                    body: formData,
                  })
                    .then((res) => res.json())
                    .then((res) => {
                      if (res.msg === "success") {
                        if (res.avatarLink !== "")
                          setAvatarLink(res.avatarLink);
                        else setAvatarLink(defaultAvatar);
                        toast.success("Profile details saved!", {
                          duration: 3000,
                        });
                        setName(res.name);
                        setFinalUsername(res.username);
                        setIntro(res.intro);
                        setIsProfileSaving(false);
                      } else if (res.msg === "failure") {
                        toast.success("Username already set!", {
                          duration: 3000,
                        });
                      }
                    })
                    .catch((err) => console.error(err));
                }}
              >
                <label htmlFor="name">Name</label>
                <Input
                  type="name"
                  placeholder="Name"
                  required
                  className="selection:bg-[#085fd2]"
                  id="name"
                  defaultValue={name}
                  ref={nameInput}
                />
                <label htmlFor="username">Username</label>
                <Input
                  type="username"
                  placeholder="Username"
                  required
                  id="username"
                  className="selection:bg-[#085fd2]"
                  defaultValue={finalUsername}
                  ref={usernameInput}
                  onInput={() => {
                    fetch(backendURL + "/me/username-available", {
                      method: "POST",
                      credentials: "include",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        username: usernameInput.current.value,
                      }),
                    })
                      .then((res) => res.json())
                      .then((res) => {
                        if (res.msg === "yes") {
                          setIsUsernameAvailable(true);
                          setUsername(usernameInput.current.value);
                        } else if (res.msg === "no") {
                          setIsUsernameAvailable(false);
                        }
                      })
                      .catch((err) => {
                        console.log(err);
                      });
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
                  ref={introInput}
                  defaultValue={intro}
                />
                <div className="flex justify-start items-center gap-2">
                  <Button
                    type="button"
                    className="cursor-pointer w-fit h-[1.5rem] p-1 px-2 py-3 text-[0.9rem] bg-transparent border-1 hover:bg-gray-100"
                  >
                    <label
                      htmlFor="avatar-img"
                      className="flex items-center gap-1 cursor-pointer text-[0.87rem] text-black ml-1"
                    >
                      <Upload className="w-[0.95rem]" />
                      Upload picture
                    </label>
                  </Button>
                  <Input
                    type="file"
                    name="avatar-img"
                    className="hidden"
                    accept=".jpg,.png"
                    id="avatar-img"
                    ref={avatarInput}
                    onChange={() => {
                      const avatarReader = new FileReader();
                      if (avatarInput.current.files[0].size > 2 * 1024 * 1024) {
                        // >2MB
                        toast.error("File too large! Please upload below 2MB", {
                          duration: 3000,
                        });
                        return;
                      }
                      avatarReader.onload = function (e) {
                        avatarImg.current.src = e.target.result;
                      };
                      avatarReader.readAsDataURL(avatarInput.current.files[0]);
                    }}
                  />
                </div>
                <Button
                  variant="outline"
                  className={`w-fit items-start ${
                    isUsernameAvailable && username !== "" && !isProfileSaving
                      ? "cursor-pointer hover:bg-[#66a447] hover:text-white items-center"
                      : "pointer-events-none bg-gray-200 items-center"
                  }`}
                  type="submit"
                >
                  <Save />
                  {isProfileSaving ? (
                    <div className="flex gap-1 items-center">
                      <Circles
                        height={20}
                        width={20}
                        color="#000"
                        ariaLabel="loading"
                      />
                      <span>Saving</span>
                    </div>
                  ) : (
                    "Save changes"
                  )}
                </Button>
              </form>
            </PopoverContent>
          </Popover>
        </div>
        <hr className="mt-4 mx-10 border-t-1 border-gray-200" />
        <div className="flex flex-wrap mx-10 justify-center">
          <div className="h-18 w-27 flex flex-col justify-center items-center hover:scale-[1.1] duration-500 cursor-pointer">
            <p className="text-gray-500 font-semibold">Followers</p>
            <p className="text-[#73d244] text-[1.3rem] font-bold">
              {followersNum}
            </p>
          </div>
          <div className="h-18 w-27 flex flex-col justify-center items-center hover:scale-[1.1] duration-500 cursor-pointer">
            <p className="text-gray-500 font-semibold">Following</p>
            <p className="text-[#73d244] text-[1.3rem] font-bold">
              {followingNum}
            </p>
          </div>
          <div className="h-18 w-27 flex flex-col justify-center items-center hover:scale-[1.1] duration-500 cursor-pointer">
            <p className="text-gray-500 font-semibold">Posts</p>
            <p className="text-[#73d244] text-[1.3rem] font-bold">{postsNum}</p>
          </div>
          <div className="h-18 w-27 flex flex-col justify-center items-center hover:scale-[1.1] duration-500 cursor-pointer">
            <p className="text-gray-500 font-semibold">Projects</p>
            <p className="text-[#73d244] text-[1.3rem] font-bold">
              {projectsNum}
            </p>
          </div>
          <div className="h-18 w-27 flex flex-col justify-center items-center hover:scale-[1.1] duration-500 cursor-pointer">
            <p className="text-gray-500 font-semibold">Joined</p>
            <p className="text-[#222322] text-[1.3rem] font-bold">
              {dateJoined}
            </p>
          </div>
        </div>
        <hr className="mx-10 border-t-1 border-gray-200" />

        <Tabs defaultValue="about" className="mt-5 flex w-78">
          <TabsList className="flex gap-2 flex-wrap h-fit">
            <TabsTrigger
              value="about"
              className="cursor-pointer py-2 text-black rounded-md data-[state=active]:text-white data-[state=active]:bg-[#7ac655]
    hover:bg-gray-100 transition"
            >
              <BadgeInfo />
              About
            </TabsTrigger>
            <TabsTrigger
              value="education"
              className="cursor-pointer px-4 py-2 text-black rounded-md data-[state=active]:text-white data-[state=active]:bg-[#7ac655]
    hover:bg-gray-100 transition"
            >
              <BookOpenText />
              Education
            </TabsTrigger>
            <TabsTrigger
              value="skills"
              className="cursor-pointer px-4 py-2 text-black rounded-md data-[state=active]:text-white data-[state=active]:bg-[#7ac655]
    hover:bg-gray-100 transition"
            >
              <Code />
              Skills
            </TabsTrigger>
          </TabsList>
          <TabsContent value="about">
            <Textarea
              className="ml-1 w-full h-[10rem] overflow-auto"
              placeholder="Write something about you"
              ref={aboutInput}
              defaultValue={aboutValue}
            />
            <Button
              className="w-full ml-1 mt-2 text-[1.1rem] cursor-pointer"
              variant={"outline"}
              ref={aboutSaveBtn}
              onClick={() => {
                fetch(backendURL + "/me/save-about", {
                  method: "POST",
                  credentials: "include",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    about: aboutInput.current.value,
                  }),
                }).then(() => {
                  toast.success("About section saved!", { duration: 3000 });
                  setAboutValue(aboutInput.current.value);
                });
              }}
            >
              Save
            </Button>
          </TabsContent>
          <TabsContent value="education">
            <div className="flex w-full max-w-sm items-center gap-2">
              <Input type="text" placeholder="Add education" />
              <Button type="submit" variant="outline" className="flex gap-1 cursor-pointer">
                <Plus />
                <p>Add</p>
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="skills">Skills</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Profile;
