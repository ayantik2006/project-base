// Copyright 2025 Ayantik Sarkar
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// See the LICENSE file in the project root for license information.
// SPDX-License-Identifier: Apache-2.0

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

function Navbar() {
  const navigate = useNavigate();
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  return (
    <div className="w-full fixed top-0 h-16 border-b-2 border-gray-200 flex items-center mb-10 z-10 opacity-100 bg-white">
      <div className="min-sm:hidden ml-auto mr-5 flex items-center justify-between w-full">  
        <div className="ml-5">
            Logo
        </div>      
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full hover:bg-gray-200 hover:cursor-pointer duration-300 w-8 h-8 outline-none">
            <button className="rounded-full hover:bg-gray-200 hover:cursor-pointer duration-300 w-8 h-8 outline-none">
              <i className="fa-solid fa-bars"></i>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mt-[0.6rem] mr-2">
            <DropdownMenuItem>Notifications</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="cursor-pointer">
                My Account
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem className="cursor-pointer">
                    <i className="fa-solid fa-user"></i>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <i className="fa-solid fa-gear"></i>
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                      fetch(backendURL + "/auth/signout", {
                        method: "POST",
                        credentials: "include",
                        headers: { "Content-Type": "application/json" },
                      })
                        .then(() => {
                          navigate("/signin");
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }}
                  >
                    <i className="fa-solid fa-right-from-bracket"></i>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="max-sm:hidden flex justify-between w-full">
        <div className="ml-5">Logo</div>
        <div className="flex gap-6 items-center mr-10 ">
          <a
            id="navbar-about-us"
            className={`cursor-pointer font-semibold
            hover:text-[#325e17]
            after:content-['']
            after:absolute
            after:h-[3px]
            after:w-[5.6rem]
            after:bottom-4
            after:right-38
            after:bg-[#9ee86f]
            after:scale-x-0
            after:origin-center
            after:transition-transform
            after:duration-300
            hover:after:scale-x-100`}
          >
            Notifications
          </a>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <a
                className={`cursor-pointer font-semibold ${
                  location.pathname === "/signup" ? "text-[#325e17]" : "black"
                }
            hover:text-[#325e17]
            after:content-['']
            after:absolute
            after:h-[3px]
            after:w-[5.5rem]
            after:bottom-4
            after:right-10
            after:bg-[#9ee86f]
            after:scale-x-0
            after:origin-center
            after:transition-transform
            after:duration-300
            hover:after:scale-x-100`}
              >
                My Account
              </a>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="cursor-pointer">
                <i className="fa-solid fa-user "></i>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <i className="fa-solid fa-gear"></i>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  fetch(backendURL + "/auth/signout", {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                  })
                    .then(() => {
                      navigate("/signin");
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              >
                <i className="fa-solid fa-right-from-bracket"></i>
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
