// Copyright 2025 Ayantik Sarkar
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// See the LICENSE file in the project root for license information.
// SPDX-License-Identifier: Apache-2.0

import Lottie from "lottie-react";
import notFoundAnim from "../assets/404.json";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center">
      <Lottie animationData={notFoundAnim} loop={true} className="w-[20rem]" />

      <Button
        onClick={() => {navigate("/")}}
        className="mt-4 px-4 py-2 rounded-lg  duration-300 font-bold cursor-pointer border-2 border-[#aaff00] text-[#93db04] hover:bg-[#aaff00]"
        variant={"outline"}
      >
        Go Home
      </Button>
    </div>
  );
}

export default NotFound;
