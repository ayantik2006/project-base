// Copyright 2025 Ayantik Sarkar
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// See the LICENSE file in the project root for license information.
// SPDX-License-Identifier: Apache-2.0

import Lottie from "lottie-react";
import notFoundAnim from "../assets/404.json";

function NotFound() {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center">
      
        <Lottie animationData={notFoundAnim} loop={true} className="w-[20rem]"/>
      
      <a
        href="/"
        className="mt-4 px-4 py-2 bg-[#7ac655] text-white rounded-lg hover:bg-[#69aa49] duration-300 font-semibold"
      >
        Go Home
      </a>
    </div>
  );
}

export default NotFound;
