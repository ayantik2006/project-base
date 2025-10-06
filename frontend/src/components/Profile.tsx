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
  Building2,
  CalendarDays,
  Code,
  List,
  Plus,
  SquarePen,
  Trash,
  Trash2,
  WandSparkles,
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
import "react-day-picker/style.css";

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
  const [isAboutEnhancing, setIsAboutEnhancing] = useState(false);
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
  const [experienceList, setExperienceList] = useState({});
  const educationInput = useRef(null);
  const skillInput = useRef(null);
  const [introCharCount, setIntroCharCount] = useState(0);
  const [aboutCharCount, setAboutCharCount] = useState(0);

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
        setIntroCharCount(intro.length);
        setAvatarLink(res.avatarLink === "" ? defaultAvatar : res.avatarLink);
        setDateJoined(res.joined.split(",")[0]);
        setFollowersNum(res.followersNum);
        setFollowingNum(res.followingNum);
        setPostsNum(res.postsNum);
        setProjectsNum(res.projectsNum);
        setAboutValue(res.about);
        setAboutCharCount(aboutValue.length);
        Object.keys(res.education).length !== 0
          ? setEducationList(res.education)
          : setEducationList({});
        Object.keys(res.skill).length !== 0
          ? setSkillList(res.skill)
          : setSkillList({});
        Object.keys(res.experience).length !== 0
          ? setExperienceList(res.experience)
          : setExperienceList({});
      })
      .catch((err) => {
        console.log(err);
      });
  }, [aboutValue.length, backendURL, intro.length]);

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
            {avatarLink!==defaultAvatar && <Button
              variant="outline"
              className={`cursor-pointer w-fit h-[1.5rem] text-[0.9rem] hover:bg-red-600 hover:text-white py-3 px-2 $`}
              type="button"
              onClick={(e) => {
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
                    e.target.style.display="none"
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              <Trash2 className=""/>
              Remove
            </Button>}
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
                setIntroCharCount(intro.length);
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
                <i className="fa-solid fa-user-pen"></i>
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
                <label htmlFor="name" className="text-[#619c44] font-semibold">Name</label>
                <Input
                  type="name"
                  placeholder="Name"
                  required
                  className="selection:bg-[#085fd2]"
                  id="name"
                  defaultValue={name}
                  ref={nameInput}
                />
                <label htmlFor="username" className="text-[#619c44] font-semibold">Username</label>
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
                <label htmlFor="intro" className="text-[#619c44] font-semibold">Profile introduction</label>
                <Textarea
                  placeholder="Profile introduction"
                  required
                  id="intro"
                  className="selection:bg-[#085fd2]"
                  ref={introInput}
                  defaultValue={intro}
                  maxLength={150}
                  onInput={() => {
                    setIntroCharCount(introInput.current.value.length);
                  }}
                />
                <p className="text-[#979696] text-[0.85rem] font-semibold mt-[-0.4rem] ml-auto">
                  {introCharCount}/150
                </p>
                <div className="flex justify-start items-center gap-2">
                  
                  <Button
                    type="button"
                    className="cursor-pointer w-full text-[0.9rem] bg-transparent border-1 hover:bg-gray-100"
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
                  className={`w-full items-start ${
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
            <p className="text-gray-500+ font-semibold">Joined</p>
            <p className="text-[#222322] text-[1.3rem] font-bold">
              {dateJoined}
            </p>
          </div>
        </div>
        <hr className="mx-10 border-t-1 border-gray-200" />

        <Tabs
          defaultValue="about"
          className="mt-5 flex items-center justify-center"
          onValueChange={(value) => {
            if (value === "about") {
              setAboutCharCount(aboutValue.length);
            }
          }}
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
              value="experience"
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
              maxLength={400}
              onInput={() => {
                setAboutCharCount(aboutInput.current.value.length);
              }}
            />
            <p className="text-[#979696] text-[0.85rem] font-semibold ml-auto">
              {aboutCharCount}/400
            </p>
            <div className="flex items-center gap-2">
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
              <Button
                variant={"outline"}
                className={`${
                  isAboutEnhancing ? "pointer-events-none bg-gray-300" : ""
                }  mt-[0.5rem] cursor-pointer`}
                onClick={() => {
                  setIsAboutEnhancing(true);
                  fetch(backendURL + "/me/enhance-about", {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      about: aboutInput.current.value,
                    }),
                  })
                    .then((res) => res.json())
                    .then((res) => {
                      aboutInput.current.value = res.refinedAbout;
                      setIsAboutEnhancing(false);
                      toast.success(
                        "Click on Save to save the refined version!",
                        { duration: 4000 }
                      );
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              >
                {isAboutEnhancing ? (
                  <div className="flex gap-1 items-center">
                    <Circles
                      height={20}
                      width={20}
                      color="#000"
                      ariaLabel="loading"
                    />
                    <span>Enhancing</span>
                  </div>
                ) : (
                  <div className="flex gap-1 items-center">
                    <WandSparkles />
                    <span>AI Enhance</span>
                  </div>
                )}
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="education" className="w-full flex flex-col">
            <Textarea
              className="ml-1 w-[full] min-h-0 h-[2.6rem] overflow-auto wrap-anywhere"
              placeholder="Add education detail (with dates)"
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
                      className="w-4 relative top-[0.08rem] cursor-pointer hover:scale-[1.2] hover:text-red-500 duration-300"
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
          <TabsContent value="experience" className=" w-full">
            <form
              className="flex flex-col justify-center gap-2 mt-2"
              onSubmit={(e) => {
                const uuid = uuidv4();
                const newExperienceList = {
                  ...experienceList,
                  [uuid]: {
                    company: e.currentTarget[0].value,
                    description: e.currentTarget[1].value,
                    startDate: e.currentTarget[2].value,
                    endDate: e.currentTarget[3].value,
                  },
                };
                setExperienceList(newExperienceList);

                e.preventDefault();
                fetch(backendURL + "/me/add-experience", {
                  method: "POST",
                  credentials: "include",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    experienceList: newExperienceList,
                  }),
                })
                  .then((res) => res.json())
                  .then((res) => {
                    toast.success("New Experience added!", { duration: 3000 });
                    setExperienceList(res.experienceList);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              <label
                htmlFor="experience-company"
                className="justify-self-start font-semibold flex gap-2 text-[#588c3e]"
              >
                <Building2 className="w-5" />
                <p>Company/Organisaton/Place</p>
              </label>
              <Input
                id="experience-company"
                className="selection:bg-blue-700"
                required
                placeholder="Place of work"
              />
              <label
                htmlFor="experience-description"
                className="justify-self-start font-semibold flex gap-2 text-[#588c3e]"
              >
                <List className="w-5" />
                <p>Description</p>
              </label>
              <Input
                id="experience-description"
                className="selection:bg-blue-700"
                required
                placeholder="Describe your work briefly"
              />

              <div className="flex justify-between items-center gap-7">
                <div className="flex flex-col gap-1">
                  <label
                    className="font-semibold flex gap-2 text-[#588c3e]"
                    htmlFor="experience-start-date flex "
                  >
                    <CalendarDays className="w-5" />
                    <p>Start Date</p>
                  </label>
                  <Input
                    className="selection:bg-blue-700"
                    id="experience-start-date"
                    placeholder="Start date"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    className="font-semibold flex gap-2 text-[#588c3e]"
                    htmlFor="experience-end-date"
                  >
                    <CalendarDays className="w-5" />
                    <p>End Date</p>
                  </label>
                  <Input
                    className="selection:bg-blue-700"
                    id="experience-end-date"
                    placeholder="End end"
                    required
                  />
                </div>
              </div>

              <Button variant={"outline"} className="w-fit cursor-pointer mt-2">
                <Plus />
                Add
              </Button>
            </form>

            {Object.keys(experienceList).reverse().map((key) => {
              return (
                <div
                  className="shadow-[0_0_10px_#cbd1cc] w-full h-fit p-5 mt-2 rounded-lg hover:shadow-[0_0_20px_#cbd1cc] hover:scale-[1.02] duration-300 flex flex-col"
                  key={key}
                >
                  <div className="ml-auto flex items-center gap-4 mt-[-0.5rem]">
                    <i
                      className="fa-solid fa-pen-to-square text-gray-500 text-[0.9rem] cursor-pointer hover:text-[#7ac655] duration-300"
                      onClick={() => {}}
                    ></i>
                    <i
                      className="fa-solid fa-trash  text-gray-500 text-[0.8rem] cursor-pointer duration-300 relative top-[0.045rem] hover:text-[#fa0526]"
                      onClick={(event) => {
                        const e = event.currentTarget;
                        const style = e.style;
                        if (e.classList.contains("fa-trash")) {
                          e.classList.remove("fa-trash");
                          e.classList.add("fa-check");
                          e.style.color = "#fa0526";
                          setTimeout(() => {
                            e.classList.remove("fa-check");
                            e.classList.add("fa-trash");
                            e.style = style;
                          }, 3000);
                        } else {
                          fetch(backendURL + "/me/delete-experience", {
                            method: "POST",
                            credentials: "include",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              experienceID:key
                            }),
                          })
                            .then((res) => res.json())
                            .then((res) => {
                              setExperienceList(res.newExperience);
                            })
                            .catch((err) => {
                              console.log(err);
                            });
                        }
                      }}
                    ></i>
                  </div>
                  <div
                    className="border-l-3 border-l-[#7ac655] pl-2 h-fit"
                    key={key}
                  >
                    <h2 className="font-semibold text-[1.5rem] text-[#7ac655]">
                      {experienceList[key].company}
                    </h2>
                    <p className="text-[0.9rem] text-gray-400">
                      {experienceList[key].startDate} -{" "}
                      {experienceList[key].endDate}
                    </p>
                    <p className=" text-gray-600">
                      {experienceList[key].description}
                    </p>
                  </div>
                </div>
              );
            })}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Profile;
