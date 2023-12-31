import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { Button } from  "@chakra-ui/react";
import { useStateContext } from "../contexts/ContextProvider";
import avatar from "../data/avatar.jpg";
import {Link, useNavigate } from "react-router-dom";
const UserProfile = () => {
  const { currentColor } = useStateContext();
  const data = JSON.parse(localStorage.getItem("data"));
  return (
    
   
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
     
        <Button
          icon={<MdOutlineCancel/>}
          color="rgb(222, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
          style={{width:"35px",height:"35px"}}
        />
      </div>
      <Link  to="/userInfo">
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={avatar}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200">
            {" "}
            {data.data.username}{" "}
          </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            {" "}
            {data.data.role}{" "}
          </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
            {" "}
           {data.data.email}{" "}
          </p>
        </div>
      </div>
      </Link>
      {/* <div>
        {userProfileData.map((item, index) => (
          <div
            key={index}
            className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]"
          >
            <Link  to={item.link}>
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className=" text-xl rounded-lg p-3 hover:bg-light-gray"
            >
              {item.icon}
          
            </button>
            </Link>
            <div>
              <p className="font-semibold dark:text-gray-200 ">{item.title}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400">
                {" "}
                {item.desc}{" "}
              </p>
            </div>
          </div>
        ))}
      </div> */}
      <div className="mt-5"  >
        
        <Button 
      
         className={ `p-3 w-full hover:drop-shadow-xl`}
         style={{ backgroundColor: currentColor, color:"white", borderRadius:"10px", height:"50px" }}
      
        >
          <Link to="/AdLogout">Logout</Link>
          </Button>
        
        
      </div>
    </div>
  
  );
};

export default UserProfile;
