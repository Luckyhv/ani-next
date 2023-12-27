"use client"
import React, { useContext, useEffect } from 'react';
import { DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";
import Link from "next/link"
import { ContextSearch } from '@/context/DataContext';
import styles from '../styles/Navbar.module.css'

export default function Navbarcomponent() {
    const {Isopen,setIsopen} = ContextSearch();

    useEffect(() => {
        const handleKeyDown = (e) => {
          if (e.code === 'KeyS' && e.ctrlKey) {
            e.preventDefault();
            setIsopen((prev) => !prev);
          }
        };
    
        window.addEventListener('keydown', handleKeyDown);
    
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, [setIsopen]);
    
    
    return (
        <div className={"w-full h-[64px] mx-auto fixed top-0 left-0 right-0 bg-black/50 backdrop-blur-[8px] z-[99999] transition duration-300  "}>
            <div className='flex items-center justify-between px-[4%] w-full h-[64px]  mx-auto'>
            <div className="flex ">
                <Link className="text-xl font-semibold" href="/">
                    <span className="text-3xl">A</span>niplay
                </Link>
            </div>
            <div className="flex items-center gap-5">
                <button
                    type="button"
                    title="Search"
                    onClick={() => setIsopen(true)}
                    className="w-[27px] h-[27px] outline-none"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 15l6 6m-11-4a7 7 0 110-14 7 7 0 010 14z"
                        ></path>
                    </svg>
                </button>
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform w-[27px] h-[27px]"
                            color="secondary"
                            name="Jason Hughes"
                            size="sm"
                            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="profile" className="h-14 gap-2">
                            <p className="font-semibold">Signed in as</p>
                            <p className="font-semibold">zoey@example.com</p>
                        </DropdownItem>
                        <DropdownItem key="settings">My Settings</DropdownItem>
                        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                        <DropdownItem key="logout" color="danger">
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            </div>
        </div>
    );
}
