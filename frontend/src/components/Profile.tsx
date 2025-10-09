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
  EllipsisVertical,
  Eraser,
  List,
  Pencil,
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

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
  const editAboutValue = useRef(null);
  const [isPresentExp, setIsPresentExp] = useState(false);
  const [isPresentEdu, setIsPresentEdu] = useState(false);

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
        if (res.about.trim() !== "") setAboutValue(res.about);
        else setAboutValue("Tell the world about yourself!");
        if (res.about.trim() === "") setAboutCharCount(0);
        else setAboutCharCount(aboutValue.length);
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
  }, [backendURL, intro.length, editAboutValue, aboutValue.length]);

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
            {avatarLink !== defaultAvatar && (
              <Button
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
                      e.target.style.display = "none";
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              >
                {/* <Trash2 className="" /> */}
                Remove
              </Button>
            )}
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
                <PopoverTrigger className="flex items-center gap-1 cursor-pointer">
                  <Info className="w-4 cursor-pointer" />
                  <p>{intro.slice(0, 14) + "..."}</p>
                </PopoverTrigger>
                <PopoverContent
                  side="bottom"
                  align="start"
                  className="p-3 w-80 mx-8 text-gray-500"
                >
                  {intro}
                </PopoverContent>
              </Popover>
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
              <button className="bg-[#7ac655] p-2 rounded-[1rem] font-semibold text-white text-[0.9rem] cursor-pointer hover:bg-[#66a447] duration-300 flex gap-1 items-center h-[2rem]">
                <i className="fa-solid fa-user-pen"></i>
                Edit Profile
              </button>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-2 border-2">
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
                <label htmlFor="name" className="text-[#619c44] font-semibold">
                  Name
                </label>
                <Input
                  type="name"
                  placeholder="Name"
                  required
                  className="selection:bg-[#085fd2]"
                  id="name"
                  defaultValue={name}
                  ref={nameInput}
                />
                <label
                  htmlFor="username"
                  className="text-[#619c44] font-semibold"
                >
                  Username
                </label>
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
                <label htmlFor="intro" className="text-[#619c44] font-semibold">
                  Profile introduction
                </label>
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
                    className="cursor-pointer w-full text-[0.9rem] bg-transparent border-1 hover:bg-gray-100 rounded-[2rem]"
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
                    accept=".jpg,.png,.jpeg"
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
                  className={`w-full rounded-[2rem] items-start ${
                    isUsernameAvailable && username !== "" && !isProfileSaving
                      ? "cursor-pointer bg-[#7ac655] text-white hover:bg-[#66a447] hover:text-white items-center"
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
        <div className="flex flex-wrap mx-10 justify-center gap-1">
          <div className="h-18 w-27 flex flex-col justify-center items-center hover:scale-[1.1] duration-300 cursor-pointer">
            <p className="text-gray-500 font-semibold">Followers</p>
            <p className="text-[#73d244] text-[1.3rem] font-bold">
              {followersNum}
            </p>
          </div>
          <div className="h-18 w-26 flex flex-col justify-center items-center hover:scale-[1.1] duration-300 cursor-pointer ">
            <p className="text-gray-500 font-semibold">Following</p>
            <p className="text-[#73d244] text-[1.3rem] font-bold">
              {followingNum}
            </p>
          </div>
          <div className="h-18 w-26 flex flex-col justify-center items-center hover:scale-[1.1] duration-300 cursor-pointer rounded-lg">
            <p className="text-gray-500 font-semibold">Posts</p>
            <p className="text-[#73d244] text-[1.3rem] font-bold">{postsNum}</p>
          </div>
          <div className="h-18 w-26 flex flex-col justify-center items-center hover:scale-[1.1] duration-300 cursor-pointer">
            <p className="text-gray-500 font-semibold">Projects</p>
            <p className="text-[#73d244] text-[1.3rem] font-bold">
              {projectsNum}
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
              className="cursor-pointer py-2 text-black rounded-[2rem] data-[state=active]:text-white data-[state=active]:bg-[#7ac655]
    hover:bg-gray-100 transition"
            >
              <BadgeInfo />
              About
            </TabsTrigger>
            <TabsTrigger
              value="education"
              className="cursor-pointer px-4 py-2 text-black rounded-[2rem] data-[state=active]:text-white data-[state=active]:bg-[#7ac655]
    hover:bg-gray-100 transition"
            >
              <BookOpenText />
              Education
            </TabsTrigger>
            <TabsTrigger
              value="skills"
              className="cursor-pointer px-4 py-2 text-black rounded-[2rem] data-[state=active]:text-white data-[state=active]:bg-[#7ac655]
    hover:bg-gray-100 transition"
            >
              <Code />
              Skills
            </TabsTrigger>
            <TabsTrigger
              value="experience"
              className="cursor-pointer px-4 py-2 text-black rounded-[2rem] data-[state=active]:text-white data-[state=active]:bg-[#7ac655]
    hover:bg-gray-100 transition flex items-center justify-center"
            >
              <BriefcaseBusiness />
              <p>Experience</p>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="about" className="w-full flex flex-col">
            <div className="flex justify-between bg-[#f5f5f5] pr-1 rounded-[0.5rem]">
              <p
                className="ml-1 w-[full] h-fit bg-[#f5f5f5] p-3 rounded-[0.5rem] overflow-auto text-gray-500 italic hover:scale-[1.03] duration-300 cursor-default"
                ref={aboutInput}
              >
                {aboutValue}
              </p>
              <Popover>
                <PopoverTrigger className="self-start">
                  <button className="self-start hover:bg-gray-300 cursor-pointer mt-3 rounded-full p-[0.1rem] duration-300 hover:scale-[1.03]">
                    <EllipsisVertical className="w-5 h-5 text-gray-500" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-fit p-1 mr-3 flex flex-col gap">
                  <Dialog
                    onOpenChange={() => {
                      if (aboutValue !== "Tell the world about yourself!")
                        setAboutCharCount(aboutValue.length);
                      else setAboutCharCount(0);
                    }}
                  >
                    <form>
                      <DialogTrigger asChild>
                        <div className="p-1 text-[0.9rem] hover:bg-gray-100 rounded  cursor-pointer flex items-center gap-1 duration-300 justify-between">
                          {/* <SquarePen /> */}
                          <p>Edit</p>
                          {/* <i className="fa-solid fa-pen-to-square text-[0.8rem] relative bottom-[0.1rem]"></i> */}
                        </div>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Edit about section</DialogTitle>
                          <DialogDescription>
                            Make changes to your about section here. Click save
                            when you&apos;re done.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                          <div className="grid gap-3">
                            {/* <Label htmlFor="name-1">Name</Label> */}
                            <Textarea
                              ref={editAboutValue}
                              defaultValue={
                                aboutValue.trim() ==
                                "Tell the world about yourself!"
                                  ? ""
                                  : aboutValue
                              }
                              placeholder="Write something about you"
                              onInput={() => {
                                setAboutCharCount(
                                  editAboutValue.current.value.length
                                );
                              }}
                            />
                            <p className="text-[#979696] text-[0.85rem] font-semibold ml-auto">
                              {aboutCharCount}/400
                            </p>
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button
                              variant="outline"
                              className="cursor-pointer"
                            >
                              Cancel
                            </Button>
                          </DialogClose>
                          <Button
                            variant={"outline"}
                            className={`${
                              isAboutEnhancing
                                ? "pointer-events-none bg-gray-300"
                                : ""
                            } cursor-pointer`}
                            onClick={() => {
                              setIsAboutEnhancing(true);
                              fetch(backendURL + "/me/enhance-about", {
                                method: "POST",
                                credentials: "include",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                  about: editAboutValue.current.value,
                                }),
                              })
                                .then((res) => res.json())
                                .then((res) => {
                                  editAboutValue.current.value =
                                    res.refinedAbout;
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
                          <Button
                            type="submit"
                            className="bg-[#7ac655] hover:bg-[#6aaa49] cursor-pointer"
                            onClick={() => {
                              fetch(backendURL + "/me/save-about", {
                                method: "POST",
                                credentials: "include",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                  about: editAboutValue.current.value,
                                }),
                              }).then(() => {
                                toast.success("About section saved!", {
                                  duration: 3000,
                                });
                                setAboutValue(editAboutValue.current.value);
                              });
                            }}
                          >
                            Save changes
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </form>
                  </Dialog>
                  <div
                    className="border-none p-1 text-[0.9rem] hover:bg-gray-100 rounded cursor-pointer flex gap-1 items-center duration-300"
                    onClick={() => {
                      fetch(backendURL + "/me/save-about", {
                        method: "POST",
                        credentials: "include",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          about: "",
                        }),
                      }).then(() => {
                        toast.success("About section empty!", {
                          duration: 3000,
                        });
                        setAboutValue("");
                      });
                    }}
                  >
                    {/* <Eraser className="w-4" /> */}
                    <p className="">Clear About</p>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex items-center gap-2"></div>
          </TabsContent>
          <TabsContent value="education" className="w-full flex flex-col">
            <Dialog
              onOpenChange={() => {
                setIsPresentEdu(false);
              }}
            >
              <form>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full cursor-pointer">
                    <Plus />
                    <p>Add new Education</p>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add new Education</DialogTitle>
                    <DialogDescription>
                      Add a new education here. Click add when you&apos;re done.
                    </DialogDescription>
                  </DialogHeader>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const uuid = uuidv4();
                      console.log(e.currentTarget[7].value);

                      let newEducationList = {
                        ...educationList,
                        [uuid]: {
                          school: e.currentTarget[0].value,
                          description: e.currentTarget[1].value,
                          startDate:
                            e.currentTarget[3].value +
                            " " +
                            String(e.currentTarget[4].value),
                          endDate: isPresentEdu
                            ? "Present"
                            : e.currentTarget[6].value +
                              " " +
                              String(e.currentTarget[7].value),
                        },
                      };
                      setEducationList(newEducationList);

                      fetch(backendURL + "/me/add-education", {
                        method: "POST",
                        credentials: "include",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          educationList: newEducationList,
                        }),
                      })
                        .then((res) => res.json())
                        .then((res) => {
                          toast.success("New Education added!", {
                            duration: 3000,
                          });
                          setEducationList(res.educationList);
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }}
                  >
                    <div className="grid gap-4">
                      <div className="grid gap-3">
                        <Label htmlFor="name-1">School</Label>
                        <Input
                          className="selection:bg-blue-700"
                          placeholder="School"
                          required
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="username-1">Description</Label>
                        <Textarea placeholder="Degree/Learning" required />
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="grid gap-3">
                          <Label>Start Date</Label>
                          <Select required>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Month" />
                            </SelectTrigger>
                            <SelectContent className="h-[10rem]">
                              <SelectItem value="January">January</SelectItem>
                              <SelectItem value="February">February</SelectItem>
                              <SelectItem value="March">March</SelectItem>
                              <SelectItem value="April">April</SelectItem>
                              <SelectItem value="May">May</SelectItem>
                              <SelectItem value="June">June</SelectItem>
                              <SelectItem value="July">July</SelectItem>
                              <SelectItem value="August">August</SelectItem>
                              <SelectItem value="September">
                                September
                              </SelectItem>
                              <SelectItem value="October">October</SelectItem>
                              <SelectItem value="November">November</SelectItem>
                              <SelectItem value="December">December</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Input
                          type="number"
                          className="relative top-[1.15rem] w-[5rem] selection:bg-blue-700"
                          placeholder="Year"
                          required
                        ></Input>
                      </div>
                      <div className="flex items-center gap-3">
                        {!isPresentEdu && (
                          <div className="grid gap-3">
                            <Label>End Date</Label>
                            <Select required>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Month" />
                              </SelectTrigger>
                              <SelectContent className="h-[10rem]">
                                <SelectItem value="January">January</SelectItem>
                                <SelectItem value="February">
                                  February
                                </SelectItem>
                                <SelectItem value="March">March</SelectItem>
                                <SelectItem value="April">April</SelectItem>
                                <SelectItem value="May">May</SelectItem>
                                <SelectItem value="June">June</SelectItem>
                                <SelectItem value="July">July</SelectItem>
                                <SelectItem value="August">August</SelectItem>
                                <SelectItem value="September">
                                  September
                                </SelectItem>
                                <SelectItem value="October">October</SelectItem>
                                <SelectItem value="November">
                                  November
                                </SelectItem>
                                <SelectItem value="December">
                                  December
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        {!isPresentEdu && (
                          <Input
                            type="number"
                            className="relative top-[1.15rem] w-[5rem] selection:bg-blue-700"
                            placeholder="Year"
                            required
                          ></Input>
                        )}
                      </div>
                      <div className="grid gap-3">
                        <div className="flex items-center gap-2">
                          <Input
                            type="checkbox"
                            id="education-present-end-date"
                            className="w-4 accent-[#7ac655] cursor-pointer"
                            onChange={(e) => {
                              setIsPresentEdu(e.currentTarget.checked);
                            }}
                          ></Input>
                          <label
                            htmlFor="education-present-end-date"
                            className="cursor-pointer"
                          >
                            I am currently studying here
                          </label>
                        </div>
                      </div>
                    </div>

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline" className="cursor-pointer">
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button
                        type="submit"
                        className="bg-[#7ac655] hover:bg-[#69a849] cursor-pointer"
                      >
                        Add
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </form>
            </Dialog>
            {Object.keys(educationList)
              .reverse()
              .map((key) => {
                return (
                  <div
                    className="shadow-[0_0_10px_#cbd1cc]  h-fit w-full p-5 mt-2 rounded-lg hover:shadow-[0_0_20px_#cbd1cc] hover:scale-[1.02] duration-300 flex flex-col break-all"
                    key={key}
                  >
                    <div className="ml-auto flex items-center gap-4 mt-[-0.5rem]">
                      <Popover>
                        <PopoverTrigger className="mb-[-1rem] ml-[4rem]">
                          <button className="hover:bg-gray-100 rounded-full w-8 h-8 cursor-pointer mt-[-0.5rem] duration-300">
                            <EllipsisVertical className="w-4 m-auto" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-fit p-0 flex items-center justify-center">
                          <div className="flex items-center cursor-pointer p-2">
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
                                  fetch(backendURL + "/me/delete-education", {
                                    method: "POST",
                                    credentials: "include",
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                      educationID: key,
                                    }),
                                  })
                                    .then((res) => res.json())
                                    .then((res) => {
                                      setEducationList(res.newEducation);
                                    })
                                    .catch((err) => {
                                      console.log(err);
                                    });
                                }
                              }}
                            ></i>
                          </div>
                          <Dialog
                            onOpenChange={(e) => {
                              if (e) {
                                if (educationList[key].endDate === "Present") {
                                  setIsPresentEdu(true);
                                }
                              }
                              else{
                                setIsPresentEdu(false);
                              }
                            }}
                          >
                            <form>
                              <DialogTrigger asChild>
                                <div className="p-2 cursor-pointer hover:bg-gray-100">
                                  <i className="fa-solid fa-pen-to-square text-gray-600 text-[0.9rem] relative bottom-[0.03rem]"></i>
                                </div>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>Edit this education</DialogTitle>
                                  <DialogDescription>
                                    Click add when you&apos;re done.
                                  </DialogDescription>
                                </DialogHeader>
                                <form
                                  onSubmit={(e) => {
                                    e.preventDefault();
                                    const uuid = key;
                                    const school=e.currentTarget[0].value;
                                    const description=e.currentTarget[1].value;
                                    const startDate=e.currentTarget[3].value+" "+e.currentTarget[4].value;
                                    const endDate=isPresentExp?"Present":(e.currentTarget[6].value+" "+e.currentTarget[7].value);
                                    const editedEducation={
                                      school:school,
                                      description:description,
                                      startDate:startDate,
                                      endDate:endDate
                                    }
                                    educationList[uuid]=editedEducation;
                                    fetch(backendURL+"/me/edit-education",{
                                      method:"POST",
                                      credentials:"include",
                                      headers:{"Content-Type":"application/json"},
                                      body:JSON.stringify({editedEducationList:educationList,uuid:key})
                                    })
                                    .then((res)=>res.json())
                                    .then((res)=>{
                                      toast.success("Education updated and saved!",{duration:3000});
                                    })
                                  }}
                                >
                                  <div className="grid gap-4">
                                    <div className="grid gap-3">
                                      <Label>School</Label>
                                      <Input
                                        className="selection:bg-blue-700"
                                        placeholder="School"
                                        required
                                        defaultValue={
                                          educationList[key].school
                                        }
                                      />
                                    </div>
                                    <div className="grid gap-3">
                                      <Label>Description</Label>
                                      <Textarea
                                        className="selection:bg-blue-700 selection:text-white"
                                        placeholder="Degree/learnings"
                                        required
                                        defaultValue={
                                          educationList[key].description
                                        }
                                      />
                                    </div>
                                    <div className="flex gap-2 items-center">
                                      <div className="grid gap-3">
                                        <Label>Start Date</Label>
                                        <Select
                                          required
                                          defaultValue={
                                            educationList[key].startDate.split(
                                              " "
                                            )[0]
                                          }
                                        >
                                          <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Month" />
                                          </SelectTrigger>
                                          <SelectContent className="h-[10rem]">
                                            <SelectItem value="January">
                                              January
                                            </SelectItem>
                                            <SelectItem value="February">
                                              February
                                            </SelectItem>
                                            <SelectItem value="March">
                                              March
                                            </SelectItem>
                                            <SelectItem value="April">
                                              April
                                            </SelectItem>
                                            <SelectItem value="May">
                                              May
                                            </SelectItem>
                                            <SelectItem value="June">
                                              June
                                            </SelectItem>
                                            <SelectItem value="July">
                                              July
                                            </SelectItem>
                                            <SelectItem value="August">
                                              August
                                            </SelectItem>
                                            <SelectItem value="September">
                                              September
                                            </SelectItem>
                                            <SelectItem value="October">
                                              October
                                            </SelectItem>
                                            <SelectItem value="November">
                                              November
                                            </SelectItem>
                                            <SelectItem value="December">
                                              December
                                            </SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div>
                                        <Input
                                          type="number"
                                          className="w-[5rem] relative top-[1.1rem]"
                                          placeholder="Year"
                                          required
                                          defaultValue={
                                            educationList[key].startDate.split(
                                              " "
                                            )[1]
                                          }
                                        ></Input>
                                      </div>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                      {!isPresentEdu && (
                                        <div className="grid gap-3">
                                          <Label>End Date</Label>
                                          <Select required defaultValue={educationList[key].endDate.split(" ")[0]}>
                                            <SelectTrigger className="w-[180px]">
                                              <SelectValue placeholder="Month" />
                                            </SelectTrigger>
                                            <SelectContent className="h-[10rem]">
                                              <SelectItem value="January">
                                                January
                                              </SelectItem>
                                              <SelectItem value="February">
                                                February
                                              </SelectItem>
                                              <SelectItem value="March">
                                                March
                                              </SelectItem>
                                              <SelectItem value="April">
                                                April
                                              </SelectItem>
                                              <SelectItem value="May">
                                                May
                                              </SelectItem>
                                              <SelectItem value="June">
                                                June
                                              </SelectItem>
                                              <SelectItem value="July">
                                                July
                                              </SelectItem>
                                              <SelectItem value="August">
                                                August
                                              </SelectItem>
                                              <SelectItem value="September">
                                                September
                                              </SelectItem>
                                              <SelectItem value="October">
                                                October
                                              </SelectItem>
                                              <SelectItem value="November">
                                                November
                                              </SelectItem>
                                              <SelectItem value="December">
                                                December
                                              </SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                      )}
                                      <div>
                                        {!isPresentEdu && (
                                          <Input
                                            type="number"
                                            className="w-[5rem] relative top-[1.1rem]"
                                            placeholder="Year"
                                            required
                                            defaultValue={educationList[key].endDate.split(" ")[1]}
                                          ></Input>
                                        )}
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Input
                                        type="checkbox"
                                        id="edu-end-date-present"
                                        className="w-4 accent-[#7ac655] cursor-pointer"
                                        defaultChecked={
                                          educationList[key].endDate ===
                                          "Present"
                                        }
                                        onChange={(e) => {
                                          setIsPresentEdu(
                                            e.currentTarget.checked
                                          );
                                        }}
                                      ></Input>
                                      <label
                                        htmlFor="edu-end-date-present"
                                        className="cursor-pointer"
                                      >
                                        I am currently studying here
                                      </label>
                                    </div>
                                  </div>
                                  <DialogFooter className="mt-4">
                                    <DialogClose asChild>
                                      <Button
                                        variant="outline"
                                        className="cursor-pointer"
                                      >
                                        Cancel
                                      </Button>
                                    </DialogClose>
                                    <Button
                                      type="submit"
                                      className="bg-[#7ac655] hover:bg-[#6fb44d] cursor-pointer"
                                    >
                                      Save Changes
                                    </Button>
                                  </DialogFooter>
                                </form>
                              </DialogContent>
                            </form>
                          </Dialog>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div
                      className="border-l-3 border-l-[#7ac655] pl-2 h-fit"
                      key={key}
                    >
                      <div className="flex items-center gap-2">
                        <h2 className="font-semibold text-[1.5rem] text-[#7ac655] peer">
                          {educationList[key].school}
                        </h2>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-[0.9rem] text-gray-400 peer italic">
                          {educationList[key].startDate}
                        </p>
                        <p className="text-[0.9rem] text-gray-400 peer italic">
                          -
                        </p>
                        <p className="text-[0.9rem] text-gray-400 peer italic">
                          {educationList[key].endDate}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-gray-600 peer">
                          {educationList[key].description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </TabsContent>

          <TabsContent value="skills" className="w-full flex flex-col">
            {/* <Input
              className="ml-1 w-[full] min-h-0 h-[2.6rem] overflow-auto wrap-anywhere selection:bg-blue-700"
              placeholder="Add new skill"
              ref={skillInput}
            /> */}
            <Dialog>
              <form>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full cursor-pointer">
                    <Plus />
                    <p>Add new Skill</p>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add new Skill</DialogTitle>
                    <DialogDescription>
                      Add a new skill here. Click add when you&apos;re done.
                    </DialogDescription>
                  </DialogHeader>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      let uuid;
                      let newSkillList;
                      if (e.currentTarget[0].value.trim() !== "") {
                        uuid = uuidv4();
                        newSkillList = {
                          ...skillList,
                          [uuid]: e.currentTarget[0].value,
                        };
                        setSkillList({
                          ...skillList,
                          [uuid]: e.currentTarget[0].value.trim(),
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
                          recentAddedSkill: e.currentTarget[0].value,
                        }),
                      })
                        .then((res) => res.json())
                        .then((res) => {
                          if (res.msg === "failure") {
                            toast.error("Cannot add empty skill!", {
                              duration: 3000,
                            });
                          } else {
                            toast.success("New skill added!", {
                              duration: 3000,
                            });
                            skillInput.current.value = "";
                          }
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }}
                  >
                    <div className="grid gap-4">
                      <div className="grid gap-3">
                        <Input
                          placeholder="Skill"
                          className="selection:bg-blue-600"
                          required
                        />
                      </div>
                    </div>
                    <DialogFooter className="mt-2">
                      <DialogClose asChild>
                        <Button variant="outline" className="cursor-pointer">
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button
                        type="submit"
                        className="bg-[#7ac655] hover:bg-[#71b54f] cursor-pointer"
                      >
                        Add
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </form>
            </Dialog>

            <div className="flex flex-wrap shadow-[0_0_10px_#cbd1cc] rounded-lg mt-3 ml-1 p-2 gap-2">
              {Object.keys(skillList).map((key) => {
                return (
                  <div
                    className="bg-[#7ac655] text-white font-semibold p-1 px-2 rounded-lg flex gap-2 items-center justify-center duration-300 hover:scale-[1.04] cursor-auto"
                    key={key}
                  >
                    {skillList[key]}
                    <X
                      className="w-4 relative top-[0.08rem] cursor-pointer"
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
            <Dialog
              onOpenChange={() => {
                setIsPresentExp(false);
              }}
            >
              <form>
                <DialogTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full cursor-pointer mb-2 flex items-center"
                  >
                    <Plus></Plus>
                    <p>Add new Experience</p>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add new experience</DialogTitle>
                    <DialogDescription>
                      Add all details about your experience. Click add when
                      you&apos;re done.
                    </DialogDescription>
                  </DialogHeader>
                  <form
                    onSubmit={(e) => {
                      const uuid = uuidv4();
                      let newExperienceList = {
                        ...experienceList,
                        [uuid]: {
                          company: e.currentTarget[0].value,
                          description: e.currentTarget[1].value,
                          startDate:
                            e.currentTarget[3].value +
                            " " +
                            String(e.currentTarget[4].value),
                          endDate: isPresentExp
                            ? "Present"
                            : e.currentTarget[6].value +
                              " " +
                              String(e.currentTarget[7].value),
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
                          toast.success("New Experience added!", {
                            duration: 3000,
                          });
                          setExperienceList(res.experienceList);
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }}
                  >
                    <div className="grid gap-4">
                      <div className="grid gap-3">
                        <Label>Company/Organisation/Place</Label>
                        <Input
                          className="selection:bg-blue-700"
                          placeholder="Place of work"
                          required
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label>Job Description</Label>
                        <Textarea
                          className="selection:bg-blue-700 selection:text-white"
                          placeholder="Description of your work"
                          required
                        />
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className="grid gap-3">
                          <Label>Start Date</Label>
                          <Select required>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Month" />
                            </SelectTrigger>
                            <SelectContent className="h-[10rem]">
                              <SelectItem value="January">January</SelectItem>
                              <SelectItem value="February">February</SelectItem>
                              <SelectItem value="March">March</SelectItem>
                              <SelectItem value="April">April</SelectItem>
                              <SelectItem value="May">May</SelectItem>
                              <SelectItem value="June">June</SelectItem>
                              <SelectItem value="July">July</SelectItem>
                              <SelectItem value="August">August</SelectItem>
                              <SelectItem value="September">
                                September
                              </SelectItem>
                              <SelectItem value="October">October</SelectItem>
                              <SelectItem value="November">November</SelectItem>
                              <SelectItem value="December">December</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Input
                            type="number"
                            className="w-[5rem] relative top-[1.1rem]"
                            placeholder="Year"
                            required
                          ></Input>
                        </div>
                      </div>
                      <div className="flex gap-2 items-center">
                        {!isPresentExp && (
                          <div className="grid gap-3">
                            <Label>End Date</Label>
                            <Select required>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Month" />
                              </SelectTrigger>
                              <SelectContent className="h-[10rem]">
                                <SelectItem value="January">January</SelectItem>
                                <SelectItem value="February">
                                  February
                                </SelectItem>
                                <SelectItem value="March">March</SelectItem>
                                <SelectItem value="April">April</SelectItem>
                                <SelectItem value="May">May</SelectItem>
                                <SelectItem value="June">June</SelectItem>
                                <SelectItem value="July">July</SelectItem>
                                <SelectItem value="August">August</SelectItem>
                                <SelectItem value="September">
                                  September
                                </SelectItem>
                                <SelectItem value="October">October</SelectItem>
                                <SelectItem value="November">
                                  November
                                </SelectItem>
                                <SelectItem value="December">
                                  December
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        <div>
                          {!isPresentExp && (
                            <Input
                              type="number"
                              className="w-[5rem] relative top-[1.1rem]"
                              placeholder="Year"
                              required
                            ></Input>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input
                          type="checkbox"
                          id="exp-end-date-present"
                          className="w-4 accent-[#7ac655] cursor-pointer"
                          onChange={(e) => {
                            setIsPresentExp(e.currentTarget.checked);
                          }}
                        ></Input>
                        <label
                          htmlFor="exp-end-date-present"
                          className="cursor-pointer"
                        >
                          I am currently working here
                        </label>
                      </div>
                    </div>
                    <DialogFooter className="mt-4">
                      <DialogClose asChild>
                        <Button variant="outline" className="cursor-pointer">
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button
                        type="submit"
                        className="bg-[#7ac655] hover:bg-[#6fb44d] cursor-pointer"
                      >
                        Add
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </form>
            </Dialog>

            {Object.keys(experienceList)
              .reverse()
              .map((key) => {
                return (
                  <div
                    className="shadow-[0_0_10px_#cbd1cc]  h-fit w-full p-5 mt-2 rounded-lg hover:shadow-[0_0_20px_#cbd1cc] hover:scale-[1.02] duration-300 flex flex-col break-all"
                    key={key}
                  >
                    <div className="ml-auto flex items-center gap-4 mt-[-0.5rem]">
                      <Popover>
                        <PopoverTrigger className="mb-[-1rem] ml-[4rem]">
                          <button className="hover:bg-gray-100 rounded-full w-8 h-8 cursor-pointer mt-[-0.5rem] duration-300">
                            <EllipsisVertical className="w-4 m-auto" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-fit p-0 flex items-center justify-center">
                          <div className="flex items-center cursor-pointer p-2">
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
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                      experienceID: key,
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
                          <Dialog
                            onOpenChange={(e) => {
                              if (e) {
                                if (experienceList[key].endDate === "Present") {
                                  setIsPresentExp(true);
                                }
                              }
                              else{
                                setIsPresentExp(false);
                              }
                            }}
                          >
                            <form>
                              <DialogTrigger asChild>
                                <div className="p-2 cursor-pointer hover:bg-gray-100">
                                  <i className="fa-solid fa-pen-to-square text-gray-600 text-[0.9rem] relative bottom-[0.03rem]"></i>
                                </div>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>Edit this experience</DialogTitle>
                                  <DialogDescription>
                                    Click add when you&apos;re done.
                                  </DialogDescription>
                                </DialogHeader>
                                <form
                                  onSubmit={(e) => {
                                    e.preventDefault();
                                    const uuid = key;
                                    const company=e.currentTarget[0].value;
                                    const description=e.currentTarget[1].value;
                                    const startDate=e.currentTarget[3].value+" "+e.currentTarget[4].value;
                                    const endDate=isPresentExp?"Present":(e.currentTarget[6].value+" "+e.currentTarget[7].value);
                                    const editedExperience={
                                      company:company,
                                      description:description,
                                      startDate:startDate,
                                      endDate:endDate
                                    }
                                    experienceList[uuid]=editedExperience;
                                    fetch(backendURL+"/me/edit-experience",{
                                      method:"POST",
                                      credentials:"include",
                                      headers:{"Content-Type":"application/json"},
                                      body:JSON.stringify({editedExperienceList:experienceList,uuid:key})
                                    })
                                    .then((res)=>res.json())
                                    .then((res)=>{
                                      toast.success("Education updated and saved!",{duration:3000});
                                    })
                                  }}
                                >
                                  <div className="grid gap-4">
                                    <div className="grid gap-3">
                                      <Label>Company/Organisation/Place</Label>
                                      <Input
                                        className="selection:bg-blue-700"
                                        placeholder="Place of work"
                                        required
                                        defaultValue={
                                          experienceList[key].company
                                        }
                                      />
                                    </div>
                                    <div className="grid gap-3">
                                      <Label>Job Description</Label>
                                      <Textarea
                                        className="selection:bg-blue-700 selection:text-white"
                                        placeholder="Description of your work"
                                        required
                                        defaultValue={
                                          experienceList[key].description
                                        }
                                      />
                                    </div>
                                    <div className="flex gap-2 items-center">
                                      <div className="grid gap-3">
                                        <Label>Start Date</Label>
                                        <Select
                                          required
                                          defaultValue={
                                            experienceList[key].startDate.split(
                                              " "
                                            )[0]
                                          }
                                        >
                                          <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Month" />
                                          </SelectTrigger>
                                          <SelectContent className="h-[10rem]">
                                            <SelectItem value="January">
                                              January
                                            </SelectItem>
                                            <SelectItem value="February">
                                              February
                                            </SelectItem>
                                            <SelectItem value="March">
                                              March
                                            </SelectItem>
                                            <SelectItem value="April">
                                              April
                                            </SelectItem>
                                            <SelectItem value="May">
                                              May
                                            </SelectItem>
                                            <SelectItem value="June">
                                              June
                                            </SelectItem>
                                            <SelectItem value="July">
                                              July
                                            </SelectItem>
                                            <SelectItem value="August">
                                              August
                                            </SelectItem>
                                            <SelectItem value="September">
                                              September
                                            </SelectItem>
                                            <SelectItem value="October">
                                              October
                                            </SelectItem>
                                            <SelectItem value="November">
                                              November
                                            </SelectItem>
                                            <SelectItem value="December">
                                              December
                                            </SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div>
                                        <Input
                                          type="number"
                                          className="w-[5rem] relative top-[1.1rem]"
                                          placeholder="Year"
                                          required
                                          defaultValue={
                                            experienceList[key].startDate.split(
                                              " "
                                            )[1]
                                          }
                                        ></Input>
                                      </div>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                      {!isPresentExp && (
                                        <div className="grid gap-3">
                                          <Label>End Date</Label>
                                          <Select required defaultValue={experienceList[key].endDate.split(" ")[0]}>
                                            <SelectTrigger className="w-[180px]">
                                              <SelectValue placeholder="Month" />
                                            </SelectTrigger>
                                            <SelectContent className="h-[10rem]">
                                              <SelectItem value="January">
                                                January
                                              </SelectItem>
                                              <SelectItem value="February">
                                                February
                                              </SelectItem>
                                              <SelectItem value="March">
                                                March
                                              </SelectItem>
                                              <SelectItem value="April">
                                                April
                                              </SelectItem>
                                              <SelectItem value="May">
                                                May
                                              </SelectItem>
                                              <SelectItem value="June">
                                                June
                                              </SelectItem>
                                              <SelectItem value="July">
                                                July
                                              </SelectItem>
                                              <SelectItem value="August">
                                                August
                                              </SelectItem>
                                              <SelectItem value="September">
                                                September
                                              </SelectItem>
                                              <SelectItem value="October">
                                                October
                                              </SelectItem>
                                              <SelectItem value="November">
                                                November
                                              </SelectItem>
                                              <SelectItem value="December">
                                                December
                                              </SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                      )}
                                      <div>
                                        {!isPresentExp && (
                                          <Input
                                            type="number"
                                            className="w-[5rem] relative top-[1.1rem]"
                                            placeholder="Year"
                                            required
                                            defaultValue={experienceList[key].endDate.split(" ")[1]}
                                          ></Input>
                                        )}
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Input
                                        type="checkbox"
                                        id="exp-end-date-present"
                                        className="w-4 accent-[#7ac655] cursor-pointer"
                                        defaultChecked={
                                          experienceList[key].endDate ===
                                          "Present"
                                        }
                                        onChange={(e) => {
                                          setIsPresentExp(
                                            e.currentTarget.checked
                                          );
                                        }}
                                      ></Input>
                                      <label
                                        htmlFor="exp-end-date-present"
                                        className="cursor-pointer"
                                      >
                                        I am currently working here
                                      </label>
                                    </div>
                                  </div>
                                  <DialogFooter className="mt-4">
                                    <DialogClose asChild>
                                      <Button
                                        variant="outline"
                                        className="cursor-pointer"
                                      >
                                        Cancel
                                      </Button>
                                    </DialogClose>
                                    <Button
                                      type="submit"
                                      className="bg-[#7ac655] hover:bg-[#6fb44d] cursor-pointer"
                                    >
                                      Save Changes
                                    </Button>
                                  </DialogFooter>
                                </form>
                              </DialogContent>
                            </form>
                          </Dialog>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div
                      className="border-l-3 border-l-[#7ac655] pl-2 h-fit"
                      key={key}
                    >
                      <div className="flex items-center gap-2">
                        <h2 className="font-semibold text-[1.5rem] text-[#7ac655] peer">
                          {experienceList[key].company}
                        </h2>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-[0.9rem] text-gray-400 peer italic">
                          {experienceList[key].startDate}
                        </p>
                        <p className="text-[0.9rem] text-gray-400 peer italic">
                          -
                        </p>
                        <p className="text-[0.9rem] text-gray-400 peer italic">
                          {experienceList[key].endDate}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-gray-600 peer">
                          {experienceList[key].description}
                        </p>
                      </div>
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
