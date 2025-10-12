// Copyright 2025 Ayantik Sarkar
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// See the LICENSE file in the project root for license information.
// SPDX-License-Identifier: Apache-2.0

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import Navbar from "./Navbar";

function Feed() {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
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
          if (didRun.current) return; // skip if already executed
          didRun.current = true;
          navigate("/me/profile");
          toast("You need to complete your profile first!", {
            icon: "ℹ️",
            duration: 4000,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex flex-col overflow-hidden">
      <Navbar/>
      <div className="w-full mt-[4rem] flex overflow-hidden">
        {/* left panel  */}
        <div className="m-3 h-[40.3rem] w-[20rem] shadow-[0_0_10px_#cbd1cc] rounded-lg overflow-hidden sticky top-0"> 
          
        </div>
        {/* main feed area */}
        <div className="h-fit w-[75rem] shadow-[0_0_10px_#cbd1cc] m-3 ml-0 rounded-lg overflow-auto">
          
        </div>
      </div>
    </div>
  );
}

export default Feed;
