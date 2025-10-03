// Copyright 2025 Ayantik Sarkar
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// See the LICENSE file in the project root for license information.
// SPDX-License-Identifier: Apache-2.0

import defaultAvatar from "../assets/default avatar.jpg";
import {
  BadgeInfo,
  BookOpenText,
  BriefcaseBusiness,
  Code,
  Plus,
  SquarePen,
  Trash,
  Trash2,
  X,
} from "lucide-react";
import { User } from "lucide-react";
import { Info } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
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
import { v4 as uuidv4 } from "uuid";

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
  const [theme, setTheme] = useState("light");
  const [educationList, setEducationList] = useState({});
  const [skillList, setSkillList] = useState({});
  const educationInput = useRef(null);
  const skillInput = useRef(null);

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
        Object.keys(res.education).length !== 0
          ? setEducationList(res.education)
          : setEducationList({});
        Object.keys(res.skill).length !== 0
          ? setSkillList(res.skill)
          : setSkillList({});
      })
      .catch((err) => {
        console.log(err);
      });
  }, [backendURL]);

  return (
    <div
      className={`w-screen min-h-screen flex justify-center ${
        theme === "dark" ? "bg-[#202633] " : ""
      }`}
    >
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
              className="cursor-pointer w-fit h-[1.5rem] text-[0.9rem] hover:bg-red-600 hover:text-white py-3 px-2"
              type="button"
              onClick={() => {
                avatarImg.current.src = defaultAvatar;
                fetch(backendURL + "/me/delete-profile-picture", {
                  method: "POST",
                  credentials: "include",
                  headers: { "Content-Type": "application/json" },
                })
                  .then((res) => res.json())
                  .then((res) => {
                    toast.success("Profile picture removed!", {
                      duration: 3000,
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              Remove
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
              <button className="bg-[#7ac655] p-2 rounded-lg font-semibold text-white text-[0.9rem] cursor-pointer hover:bg-[#66a447] duration-300 flex gap-1 items-center h-[2rem]">
                <SquarePen className="w-4" />
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
                <Textarea
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
                    className="cursor-pointer w-fit  p-1 px-2 py-3 text-[0.9rem] bg-transparent border-1 hover:bg-gray-100"
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

        <Tabs
          defaultValue="about"
          className="mt-5 flex items-center justify-center"
        >
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
            <TabsTrigger
              value="stuff"
              className="cursor-pointer px-4 py-2 text-black rounded-md data-[state=active]:text-white data-[state=active]:bg-[#7ac655]
    hover:bg-gray-100 transition flex items-center justify-center"
            >
              <BriefcaseBusiness />
              <p>Experience</p>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="about" className="w-full flex flex-col">
            <Textarea
              className="ml-1 w-[full] h-[10rem] overflow-auto"
              placeholder="Write something about you"
              ref={aboutInput}
              defaultValue={aboutValue}
            />
            <Button
              className="ml-1 mt-2 cursor-pointer self-start"
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
              <Save />
              Save
            </Button>
          </TabsContent>
          <TabsContent value="education" className="w-full flex flex-col">
            <Textarea
              className="ml-1 w-[full] min-h-0 h-[2.6rem] overflow-auto wrap-anywhere"
              placeholder="Add education"
              ref={educationInput}
            />
            <Button
              className="ml-1 mt-2 cursor-pointer self-start"
              variant={"outline"}
              onClick={() => {
                let uuid;
                let newEducationList;
                if (educationInput.current.value.trim() !== "") {
                  uuid = uuidv4();
                  newEducationList = {
                    ...educationList,
                    [uuid]: educationInput.current.value,
                  };
                  setEducationList({
                    ...educationList,
                    [uuid]: educationInput.current.value.trim(),
                  });
                } else {
                  setEducationList({
                    ...educationList,
                  });
                }
                fetch(backendURL + "/me/add-education", {
                  method: "POST",
                  credentials: "include",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    education: newEducationList,
                    recentAddedEducation: educationInput.current.value,
                  }),
                })
                  .then((res) => res.json())
                  .then((res) => {
                    if (res.msg === "failure") {
                      toast.error("Cannot add empty education!", {
                        duration: 3000,
                      });
                    } else {
                      toast.success("New education added!", { duration: 3000 });
                      educationInput.current.value = "";
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              <Plus />
              Add
            </Button>
            {[...Object.keys(educationList)].reverse().map((key) => {
              return (
                <div
                  className="m-1 p-[0.4rem] rounded-lg flex items-center justify-between shadow-[0_0_10px_#cbd1cc] mt-4 gap-2 hover:shadow-[0_0_20px_#cbd1cc] hover:scale-[1.01] duration-300 cursor-auto"
                  key={key}
                >
                  <Textarea
                    className="p-2 min-h-0 h-[2.3rem] overflow-x-hidden w-full wrap-anywhere cursor-auto"
                    key={key}
                    value={educationList[key]}
                    readOnly
                  ></Textarea>
                  <button
                    className="cursor-pointer   duration-300 font-bold mr-1 p-1"
                    onClick={() => {
                      fetch(backendURL + "/me/delete-education", {
                        method: "POST",
                        credentials: "include",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          educationId: key,
                        }),
                      })
                        .then((res) => res.json())
                        .then((res) => {
                          setEducationList(res.education);
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }}
                  >
                    <Trash2 className="w-[1rem] font-bold hover:text-red-700 duration-300 hover:scale-[1.2]" />
                  </button>
                </div>
              );
            })}
          </TabsContent>

          <TabsContent value="skills" className="w-full flex flex-col">
            <Textarea
              className="ml-1 w-[full] min-h-0 h-[2.6rem] overflow-auto wrap-anywhere"
              placeholder="Add new skill"
              ref={skillInput}
            />
            <Button
              className="ml-1 mt-2 cursor-pointer self-start"
              variant={"outline"}
              onClick={() => {
                let uuid;
                let newSkillList;
                if (skillInput.current.value.trim() !== "") {
                  uuid = uuidv4();
                  newSkillList = {
                    ...skillList,
                    [uuid]: skillInput.current.value,
                  };
                  setSkillList({
                    ...skillList,
                    [uuid]: skillInput.current.value.trim(),
                  });
                } else {
                  setSkillList({
                    ...skillList,
                  });
                }
                fetch(backendURL + "/me/add-skill", {
                  method: "POST",
                  credentials: "include",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    skill: newSkillList,
                    recentAddedSkill: skillInput.current.value,
                  }),
                })
                  .then((res) => res.json())
                  .then((res) => {
                    if (res.msg === "failure") {
                      toast.error("Cannot add empty skill!", {
                        duration: 3000,
                      });
                    } else {
                      toast.success("New skill added!", { duration: 3000 });
                      skillInput.current.value = "";
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              <Plus />
              Add
            </Button>
            <div className="flex flex-wrap shadow-[0_0_10px_#cbd1cc] rounded-lg mt-3 ml-1 p-2 gap-2">
              {Object.keys(skillList).map((key) => {
                return (
                  <div
                    className="bg-[#7ac655] text-white font-semibold p-1 px-2 rounded-lg flex gap-2 items-center justify-center duration-300 hover:scale-[1.04] cursor-auto"
                    key={key}
                  >
                    {skillList[key]}
                    <X
                      className="w-4 relative top-[0.08rem] cursor-pointer hover:scale-[1.2] duration-300"
                      onClick={() => {
                        fetch(backendURL + "/me/delete-skill", {
                          method: "POST",
                          credentials: "include",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            skillId: key,
                          }),
                        })
                          .then((res) => res.json())
                          .then((res) => {
                            setSkillList(res.skill);
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Profile;
