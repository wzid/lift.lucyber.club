"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { AuthContext } from "./AuthProvider";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import clsx from 'clsx';
import luCyberLogo from "../../public/images/lu_cyber_logo.svg";

export default function NavBar() {
  const { currentUser } = useContext(AuthContext);

  const currentPath = usePathname();
  // if (currentPath.endsWith("/")) {
  //   currentPath = currentPath.slice(0, -1);
  // }

  const navLinks = [
    ...(currentUser
      ? [
          {
            name: "Profile",
            path: "/profile/",
          },
        ]
      : [
          {
            name: "Log In",
            path: "/auth/login/",
          },
        ]),
  ];
  return (
    <div className="w-full flex justify-between items-center pb-12 md:pb-12 sm:text-base md:text-lg mt-4">
      <Link href="/" className="hover:opacity-70 transition-opacity">
        <h1 className="text-3xl flex items-center">
          <img src="/images/lu_cyber_logo.svg" alt="cyber lifts logo" className="size-10 mt-2" />
          <span className="hidden sm:inline ml-2">Cyber <span className="font-light">Lifts</span></span>
        </h1>
      </Link>
      <div className="flex gap-3 sm:gap-6 text-lg">
        {navLinks.map(({ name, path }) => {
          return (
            <a href={path} key={name} className="hover:text-foreground/80 text-white transition-colors">{name}</a>
          );
        })}
        <a href="https://github.com/wzid"> <Icon icon="mdi:github" width="30" height="30" className="transition-opacity hover:opacity-80" /></a>
      </div>
    </div>
  );
}
