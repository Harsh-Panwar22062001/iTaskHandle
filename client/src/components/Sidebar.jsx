import React, { useState } from "react";
import { MdOutlineAddTask, MdTaskAlt } from "react-icons/md";
import { Box, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSidebar } from "../redux/slices/authSlice";
import clsx from "clsx";

const StyledSidebar = styled(Box)(({ theme }) => ({
  width: 250, // Adjust the width as per your design
  height: "100vh",
  position: "fixed",
  top: 0,
  left: 0,
  backgroundColor: theme.palette.background.paper,
  borderRight: `1px solid ${theme.palette.divider}`,
  overflowY: "auto",
  zIndex: theme.zIndex.drawer + 2, 
  marginLeft:"10px"// Ensure sidebar is above the header
}));

const linkData = [
  {
    label: "Task Management",
    link: "#",
    icon: <MdOutlineAddTask />,
    subLinks: [
      { label: "Task Master", link: "/task-master" },
      { label: "Add Task", link: "/add-task" },
      { label: "Update Task", link: "/update-task" },
      { label: "Edit Task", link: "/edit-task" },
    ],
  },
  {
    label: "Attendance Management",
    link: "#",
    icon: <MdTaskAlt />,
    subLinks: [

           
      { label: "Attendance Master", link: "/attendance-master" },
      { label: "Attendance-Report", link: "/attendance-report" },
      { label: "Planned-Leave", link: "/planned-leave" },
      { label: "Apply for Urgent Leave", link: "/urgent-leave" },
      { label: "Apply for WFH", link: "/apply-wfh" },
      { label: "Leave Master", link: "/leave-master" },
    ],
  },

  {
    label: "Expense Management",
    link: "#",
    icon: <MdTaskAlt />,
    subLinks: [

           
      { label: "Expense  master", link: "/expense-master" },
      { label: "Add expense", link: "/add-expense" },
  
    ],
  },
  {
    label: "Trash",
    link: "/trashed",
    icon: <MdOutlineAddTask />,
  },
];

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation();

  const path = location.pathname.split("/")[1];
  const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 3);

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  const NavLink = ({ el }) => {
    const isActive = path === el.link.split("/")[1];

    return (
      <div>
        <Link
          to={el.link}
          onClick={() => el.subLinks && setOpenSubMenu(el.label)}
          className={clsx(
            "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-[#2564ed2d]",
            isActive ? "bg-blue-700 text-neutral-100" : ""
          )}
        >
          {el.icon}
          <span className="hover:text-[#2564ed]">{el.label}</span>
        </Link>
        {el.subLinks && openSubMenu === el.label && (
          <div className="pl-4 mt-2">
            {el.subLinks.map((subLink) => (
              <Link
                key={subLink.label}
                to={subLink.link}
                onClick={closeSidebar}
                className={clsx(
                  "block px-3 py-2 rounded-full text-gray-700 hover:bg-[#2564ed2d]",
                  path === subLink.link.split("/")[1]
                    ? "bg-blue-700 text-neutral-100"
                    : ""
                )}
              >
                {subLink.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <StyledSidebar>
      <div className="flex justify-between items-center p-4">
        <h1 className="flex gap-1 items-center">
          <p className="bg-blue-600 p-2 rounded-full">
            <MdOutlineAddTask className="text-white text-2xl font-black" />
          </p>
          <span className="text-2xl font-bold text-black">iManagement</span>
        </h1>
        <IconButton onClick={closeSidebar} edge="end" color="inherit">
          <CloseIcon />
        </IconButton>
      </div>

      <div className="flex-1 flex flex-col gap-y-5 py-8">
        {sidebarLinks.map((link) => (
          <NavLink el={link} key={link.label} />
        ))}
      </div>

      <div className="">
        <button className="w-full flex gap-2 p-2 items-center text-lg text-gray-800">
          <MdOutlineAddTask />
          <span>Settings</span>
        </button>
      </div>
    </StyledSidebar>
  );
};

export default Sidebar;
