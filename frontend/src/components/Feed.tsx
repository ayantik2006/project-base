// Copyright 2025 Ayantik Sarkar
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// See the LICENSE file in the project root for license information.
// SPDX-License-Identifier: Apache-2.0

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import Navbar from "./Navbar";
import defaultAvatar from "../assets/default avatar.jpg";
import CreatePostEditor from "./CreatePostEditor";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function Feed() {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [avatarLink, setAvatarLink] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    fetch(backendURL + "/me/name-username", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.msg === "no name username") {
          toast("You need to complete your profile first!", {
            icon: "ℹ️",
            duration: 4000,
          });
          navigate("/me/profile");
        } else {
          fetch(backendURL + "/me/profile", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          })
            .then((res) => res.json())
            .then((res) => {
              if (res.avatarLink == "") setAvatarLink("");
              else setAvatarLink(res.avatarLink);
              setUsername(res.username);
              setName(res.name);
              setIntro(res.intro);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [backendURL, name, navigate]);

  return (
    <div className="flex flex-col ">
      <Navbar />
      <div className="w-full mt-[4rem] flex max-sm:flex-col max-sm:w-full max-sm:h-fit">
        {/* left panel  */}
        <div className="m-3 h-fit min-w-[20rem] shadow-[0_0_10px_#cbd1cc] rounded-lg overflow-hidden top-[4.8rem] sticky p-3 flex flex-col">
          {/* avatar+name+intro */}
          <div className="flex flex-col items-center cursor-pointer mt-2 border-b-2 pb-4">
            <img
              src={avatarLink === "" ? defaultAvatar : avatarLink}
              alt="avatar"
              className="w-[5rem] rounded-full border-4 border-[#7ac655]"
            />
            <div className="flex flex-col justify-center items-center">
              <h1 className="font-bold text-[1.3rem]">{name}</h1>
              <p className="text-[#858996] mt-[-0.4rem]">@{username}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 p-4">
            <Button
              variant={"outline"}
              className="cursor-pointer duration-300 hover:bg-[#7ac655] peer"
            >
              <i className="fa-solid fa-code"></i>
              Collaborate and Code
            </Button>
            <Button
              variant={"outline"}
              className="cursor-pointer duration-300 hover:bg-[#7ac655]"
            >
              <i className="fa-solid fa-play"></i>
              Code runner
            </Button>

            <Dialog>
              <DialogTrigger className="flex items-center gap-2 cursor-pointer">
                <Button className="w-full bg-[#7ac655] hover:bg-[#6cae4b] duration-300 cursor-pointer">
                  <i className="fa-solid fa-plus"></i>
                  Create Post
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create a new post!</DialogTitle>
                </DialogHeader>
                <div className="h-[25rem] rounded-3xl">
                <CreatePostEditor/>
                </div>
                <Button className="mt-[-2.5rem] bg-[#7ac655] hover:bg-[#6cae4b] cursor-pointer duration-300" >
                  <i className="fa-solid fa-paper-plane"></i>
                  Publish post
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div>
          {/* right panel */}
          <div className="h-fit shadow-[0_0_10px_#cbd1cc] m-3 ml-0 rounded-lg overflow-auto"></div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
