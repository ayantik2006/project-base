// Copyright 2025 Ayantik Sarkar
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// See the LICENSE file in the project root for license information.
// SPDX-License-Identifier: Apache-2.0

import { useRef, useState } from "react";
import googleIcon from "../assets/google icon.png";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Bars } from "react-loader-spinner";

function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen flex justify-center items-center flex-col">
      <div
        className="w-full h-15 fixed top-0 border-b-2 flex justify-between items-center"
        id="navbar"
      >
        <div className="p-4">
          <a
            className="cursor-pointer"
            onClick={() => {
              navigate(location.pathname);
            }}
          >
            Elimics
          </a>
        </div>
        <div className="flex gap-6 items-center mr-10" id="nav-elements">
          <a
            id="navbar-about-us"
            className={`cursor-pointer font-semibold ${
              location.pathname === "/about-us" ? "text-[#325e17]" : "black"
            } 
            hover:text-[#325e17]
            after:content-['']
            after:absolute
            after:h-[3px]
            after:w-[4.3rem]
            after:bottom-4
            after:right-88
            after:bg-[#9ee86f]
            after:scale-x-0
            after:origin-center
            after:transition-transform
            after:duration-300
            hover:after:scale-x-100`}
          >
            About Us
          </a>
          <a
            id="navbar-contact-us"
            className={`cursor-pointer font-semibold ${
              location.pathname === "/contact-us" ? "text-[#325e17]" : "black"
            }
            hover:text-[#325e17]
            after:content-['']
            after:absolute
            after:h-[3px]
            after:w-[4.8rem]
            after:bottom-4
            after:right-63
            after:bg-[#9ee86f]
            after:scale-x-0
            after:origin-center
            after:transition-transform
            after:duration-300
            hover:after:scale-x-100`}
          >
            Contact Us
          </a>
          <a
            className={`cursor-pointer font-semibold ${
              location.pathname === "/signin" ? "text-[#325e17]" : "black"
            }
            hover:text-[#325e17]
            after:content-['']
            after:absolute
            after:h-[3px]
            after:w-[3rem]
            after:bottom-4
            after:right-44
            after:bg-[#9ee86f]
            after:scale-x-0
            after:origin-center
            after:transition-transform
            after:duration-300
            hover:after:scale-x-100`}
            id="navbar-signin"
          >
            Sign in
          </a>
          <a
            className={`cursor-pointer font-semibold ${
              location.pathname === "/signup" ? "text-[#325e17]" : "black"
            }
            hover:text-[#325e17]
            after:content-['']
            after:absolute
            after:h-[3px]
            after:w-[6.8rem]
            after:bottom-4
            after:right-10
            after:bg-[#9ee86f]
            after:scale-x-0
            after:origin-center
            after:transition-transform
            after:duration-300
            hover:after:scale-x-100`}
            id="navbar-signup"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Create Account
          </a>
        </div>
      </div>
      <form
        className="min-h-screen flex justify-center items-center flex-col"
        method="post"
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true)
          fetch(backendURL + "/auth/signin", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: emailInput.current.value,
              password: passwordInput.current.value,
            }),
          })
            .then((res) => res.json())
            .then((res) => {
              if (res.msg === "failure") {
                setLoading(false);
                toast.error("Incorrect credentials", {
                  duration: 3000,
                });
              } else if (res.msg === "success") {
                // toast.success("Sign in success");
                // setTimeout(() => {
                //   navigate("/feed");
                // }, 2000);
                setLoading(false);
                navigate("/feed");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        <h2 className="text-gray-900 text-2xl font-bold mb-4 align-center text-[1.4rem]">
          Sign in to your Elimics Account
        </h2>
        <p className="mb-3 text-gray-600 outline-none">
          Enter your email to sign in
        </p>
        <span>
          <i className="fa-solid fa-envelope relative sm:left-[4%] left-[5%] text-gray-500"></i>
          <input
            type="email"
            className="border-2 border-gray-400 sm:w-100 w-70 h-9 rounded-lg pl-6 relative left-[-0.5rem] outline-none"
            autoFocus
            placeholder="Email"
            required
            ref={emailInput}
          />
        </span>
        <span className="mt-2 mx-0">
          <i className="fa-solid fa-lock relative sm:left-[6%] left-[7.4%] text-gray-500"></i>
          <input
            type={showPassword ? "text" : "password"}
            className="border-2 border-gray-400 w-70 sm:w-100 h-9 rounded-lg pl-6 relative sm:left-[0.1rem] left-[0.15rem] outline-none pr-7"
            placeholder="Password"
            required
            ref={passwordInput}
          />
          <i
            className={`fa-solid ${
              showPassword ? "fa-eye" : "fa-eye-slash"
            } relative sm:right-[6%] right-[8%] text-gray-500 cursor-pointer`}
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          ></i>
          <div className="flex flex-row-reverse text-[0.9rem] mr-6 mt-2 font-semibold hover:underline text-[#777171]">
            <a className="cursor-pointer" onClick={()=>{
              fetch(backendURL+"/auth/forgot-password",{
                method:"POST",
                credentials:"include",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({email:emailInput.current.value})
              })
              .then((res)=>res.json())
              .then((res)=>{
                if(res.msg==="failure 1"){
                  toast.error("Please enter a valid email!",{
                    duration:3000
                  });
                }
                else if(res.msg==="failure 2"){
                  toast.error("Password reset for Google login account is not allowed!",{
                    duration:3000
                  });
                }
                else if(res.msg==="failure 3"){
                  toast.error("Please try after some time!",{
                    duration:3000
                  });
                }
                else if(res.msg==="success"){
                  toast.success("Please check your inbox for password reset",{
                    duration:3000
                  });
                }
              })
              .catch((err)=>{console.log(err)})
            }}>Forgot password?</a>
          </div>
        </span>
        <button
          className="mt-3 bg-[#9ee86f] w-75 sm:w-100 h-10 rounded-3xl text-[1.05rem] font-semibold cursor-pointer hover:bg-[#91d566] duration-300"
          type="submit"
        >
          Signin
        </button>
        <span className="mt-3 flex">
          <div className="sm:w-30 w-20 h-[0.04rem] bg-gray-400 relative top-3"></div>
          <p className="mx-1 text-gray-400">or continue with</p>
          <div className="sm:w-30 w-20 h-[0.04rem] bg-gray-400 relative top-3"></div>
        </span>
        <button
          className="mt-3 bg-transparent w-75 sm:w-100 h-10 rounded-3xl text-[1.05rem] font-semibold cursor-pointer border border-gray-400 flex gap-2 justify-center items-center hover:bg-gray-100 duration-300"
          type="button"
          onClick={() => {
            console.log("hello to google, signin");
            window.location.href = backendURL + "/auth/google";
          }}
        >
          <img src={googleIcon} alt="google icon" className="w-6 h-6" />
          <p className="text-[1.1rem]">Google</p>
        </button>
        <p className="mt-3 text-gray-600">
          New to Base?{" "}
          <a
            className="underline cursor-pointer font-bold"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign up
          </a>
        </p>
      </form>

      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50">
          <Bars height={80} width={80} color="#05e641" secondaryColor="white" />
        </div>
      )}
    </div>
  );
}

export default Signin;
