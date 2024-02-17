"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { AuthContext } from "./AuthProvider";
import { usePathname } from "next/navigation";
import clsx from 'clsx';

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
        <h1 className="text-3xl">🏋️‍♂️ <span className="hidden sm:inline">cyber lifts</span></h1>
      </Link>
      <div className="flex gap-3 sm:gap-6 text-lg">
        {navLinks.map(({ name, path }) => {
          return (
            <a href={path} key={name} className="hover:text-foreground/80 text-white transition-colors">{name}</a>
          );
        })}
      </div>
    </div>
  );
}
