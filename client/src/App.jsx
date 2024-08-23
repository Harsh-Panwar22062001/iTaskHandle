import React from "react";
import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Login from "./pages/Login";
import TaskMaster from "./components/task/taskmaster";
import Sidebar from "./components/Sidebar";
import AddTask from "./components/task/AddTask";
import UpdateTask from "./components/task/UpdateTask";
import { TaskProvider } from './components/statemanagement/TaskContext';
import EditTask from "./components/task/EditTask";
import Header from './pages/header'




const theme = createTheme(); 

function Layout() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  return user ? (
    <div className='w-full h-screen flex flex-col md:flex-row'>
    <Header/>
      <div className='w-1/5 h-screen bg-white sticky top-0 hidden md:block'>
        <Sidebar />
      </div>
   

      <MobileSidebar />

      <div className='flex-1 overflow-y-auto'>
        <div className='p-4 2xl:px-10'>
          <Outlet />
        </div>
      </div>
      
    </div>
  ) : (
    <Navigate to='/log-in' state={{ from: location }} replace />
  );
}

const MobileSidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.auth);
  const mobileMenuRef = useRef(null);
  const dispatch = useDispatch();

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  return (
    <Transition
      show={isSidebarOpen}
      as={Fragment}
      enter='transition-opacity duration-700'
      enterFrom='opacity-x-10'
      enterTo='opacity-x-100'
      leave='transition-opacity duration-700'
      leaveFrom='opacity-x-100'
      leaveTo='opacity-x-0'
    >
      {(ref) => (
        <div
          ref={(node) => (mobileMenuRef.current = node)}
          className={clsx(
            "md:hidden w-full h-full bg-black/40 transition-all duration-700 transform ",
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          )}
          onClick={() => closeSidebar()}
        >
          <div className='bg-white w-3/4 h-full'>
            <div className='w-full flex justify-end px-5 mt-5'>
              <button
                onClick={() => closeSidebar()}
                className='flex justify-end items-end'
              >
                <IoClose size={25} />
              </button>
            </div>

            <div className='-mt-10'>
              <Sidebar />
            </div>
          </div>
        </div>
      )}
    </Transition>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <main className="w-full min-h-screen bg-[#f3f4f6]">
        <TaskProvider>
         
          <Routes>
            <Route path="/" element={<Navigate to="/task-master" />} />
            <Route path="/log-in" element={<Login />} />
            <Route element={<Layout />}>
              <Route path="/task-master" element={<TaskMaster />} />
              <Route path="/add-task" element={<AddTask />} />
              <Route path="/update-task" element={<UpdateTask />} />
              <Route path="/edit-task" element={<EditTask />} />
            </Route>
          </Routes>
        </TaskProvider>
        <Toaster richColors />
      </main>
    </ThemeProvider>
  );
}

export default App;
