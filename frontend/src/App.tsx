// Copyright 2025 Ayantik Sarkar
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// See the LICENSE file in the project root for license information.
// SPDX-License-Identifier: Apache-2.0

import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Signup from "./components/Signup";
import { useEffect } from "react";
import Signin from "./components/Signin";
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import Feed from "./components/Feed";
import { Navigate } from "react-router-dom";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetch(backendURL + "/auth/user", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.msg === "logged out" && location.pathname !== "/signup") {
          navigate("/signin");
        } else if (res.msg !== "logged out") {
          navigate("/feed");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate, location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/feed" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/me/profile" element={<Profile />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
