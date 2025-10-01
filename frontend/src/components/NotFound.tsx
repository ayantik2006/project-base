import Lottie from "lottie-react";
import notFoundAnim from "../assets/404.json";

function NotFound() {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center">
      
        <Lottie animationData={notFoundAnim} loop={true} className="w-[20rem]"/>
      
      <a
        href="/"
        className="mt-4 px-4 py-2 bg-[#1bd437] text-white rounded-lg hover:bg-[#17af2e] duration-300 font-semibold"
      >
        Go Home
      </a>
    </div>
  );
}

export default NotFound;
