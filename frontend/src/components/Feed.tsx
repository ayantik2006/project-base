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

function Feed() {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [avatarLink, setAvatarLink] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [intro, setIntro] = useState("");
  const didRun = useRef(false);

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
              if (res.avatarLink == "")
                setAvatarLink("");
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
      <div className="w-full mt-[4rem] flex max-sm:flex-col max-sm:w-full max-sm:h-[10rem]">
        {/* left panel  */}
        <div className="m-3 h-[40.3rem] min-w-[20rem] shadow-[0_0_10px_#cbd1cc] rounded-lg overflow-hidden top-[4.8rem] sticky p-3">
          {/* avatar+name+intro */}
          <div className="flex flex-col items-center">
            <img src={(avatarLink===""?defaultAvatar:avatarLink)} alt="avatar" className="w-[5rem] rounded-full border-4 border-[#7ac655]"/>
            <div className="flex flex-col">
              <h1>{name}</h1>
            </div>
          </div>
        </div>
        {/* right panel */}
        <div className="h-fit w-[75rem] shadow-[0_0_10px_#cbd1cc] m-3 ml-0 rounded-lg overflow-auto"></div>
      </div>
    </div>
  );
}

export default Feed;
