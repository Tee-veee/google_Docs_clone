// ASSETS
import { FaSearch } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { BsGrid3X3GapFill } from "react-icons/bs";
import googleDocLogo from "../assets/googleDocsLogo.svg";
import Image from "next/image";

function Header() {
  return (
    <header className="flex items-center justify-between p-4 shadow-lg ">
      <div className="flex items-center  w-2/12">
        <div className="p-2 md:p-3 hover:bg-gray-200 hover:transition-all rounded-full md:mr-4">
          <FiMenu className="text-2xl cursor-pointer" />
        </div>
        <div className="hidden md:inline-flex items-center">
          <Image
            src={googleDocLogo}
            height={40}
            width={40}
            className="cursor-pointer"
          />
          <p className="text-sm">DOCS</p>
        </div>
      </div>
      <div className="flex flex-grow w-8/12 items-center  relative">
        <input
          type="text"
          className="flex flex-grow p-1 pl-10 bg-gray-100 outline-none focus:shadow-lg rounded-lg "
          placeholder="Search"
        />
        <FaSearch className="absolute top-2 left-3" />
      </div>
      <div className="w-2/12 flex items-center justify-end">
        <div className="p-1 md:p-3 hover:bg-gray-200 hover:transition-all rounded-full md:mr-4 cursor-pointer ">
          <BsGrid3X3GapFill className="hidden md:inline-flex text-2xl " />
        </div>
        <img
          loading="lazy"
          src={
            "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
          }
          className="h-[35px] w-[35px] md:h-[50px] md:w-[50px] object-cover rounded-lg md:ml-4 hover:shadow-lg cursor-pointer hover:transition-all"
          alt="user-avatar"
        />
      </div>
    </header>
  );
}

export default Header;
