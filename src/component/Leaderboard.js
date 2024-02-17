"use client";

import React, { useState, useEffect } from "react";

import { db } from "../service/FirebaseService";
import { ref, get } from "firebase/database";

import clsx from "clsx";
import { Icon } from "@iconify/react";

export default function Leaderboard() {
  const [boardStats, setBoardStats] = useState([]);
  const [sortingMethod, setSortingMethod] = useState("");

  useEffect(() => {
    const usersRef = ref(db, "/users");
    get(usersRef)
      .then((snapshot) => {
        const data = snapshot.val();
        setBoardStats(
          Object.entries(data).map(([uid, userObject]) => {
            let sum = parseInt(userObject.deadlift) + parseInt(userObject.bench) + parseInt(userObject.squat);
            return {
              name: userObject.name,
              imageURL: userObject.imageURL,
              bench: userObject.bench,
              squat: userObject.squat,
              deadlift: userObject.deadlift,
              total: sum,
            };
          })
        );
      })
      .catch((e) => {
        console.error("Error getting user information.");
        console.error(e);
      });
  }, [sortingMethod]);

  const changeSortingMethod = (e) => {
    setSortingMethod(e.target.value);
  };

  return (
    <div className="flex flex-col w-full items-center text-sm lg:text-base pb-12">
      <div className="text-center pb-6">
        <h2 className="pb-1">Leaderboard</h2>
        <p className="text-foreground/70">Look at these guys</p>
      </div>
      <div className="form-control w-full lg:w-11/12 pb-4">
        <div className="input-group justify-center md:justify-end">
          <span>Sort By</span>
          <select className="ml-2 select select-bordered bg-background-900" onChange={changeSortingMethod}>
            <option defaultValue>Total</option>
            <option>Deadlift</option>
            <option>Bench</option>
            <option>Squat</option>
          </select>
        </div>
      </div>
      <div className="flex self-start md:self-center lg:justify-center w-full overflow-x-scroll lg:overflow-x-hidden">
        <table className="table w-full lg:w-11/12 overflow-hidden rounded-lg bg-background-800">
          <thead className="text-foreground/80 bg-background-700">
            <tr className="">
              <th className="text-lg text-center">#</th>
              <th className="text-lg">User</th>
              <th className="text-lg text-center">Bench</th>
              <th className="text-lg text-center">Squat</th>
              <th className="text-lg text-center">Deadlift</th>
              <th className="text-lg text-center">Total</th>
            </tr>
          </thead>
          <tbody>
            {boardStats
              .sort((item1, item2) => {
                if (sortingMethod === "Bench") return item2.bench - item1.bench;
                else if (sortingMethod === "Squat") return item2.squat - item1.squat;
                else if (sortingMethod === "Deadlift") return item2.deadlift - item1.deadlift;
                else return item2.total - item1.total;
              })
              .map((item, i) => {
                let pos = i + 1;
                let rankColors = {
                  1: "text-[#FACC14]",
                  2: "text-[#94A2B8]",
                  3: "text-[#854D0F]",
                };
                return (
                  <tr key={item.username + "-" + i}>
                    <th className="text-center">
                      <h3 className={clsx(rankColors[pos])}>{pos}</h3>
                    </th>
                    <td className="flex items-center">
                      {pos === 1 ? (
                        <div className="relative inline-block w-[55px]">
                          <img
                            src={item.imageURL}
                            alt="Profile"
                            className="w-[55px] h-[55px] mask mask-squircle"
                            referrerPolicy="no-referrer"
                          />
                          <Icon
                            width="32"
                            height="32"
                            icon="fa6-solid:crown"
                            className="text-2xl text-[#FACC14] absolute top-1 left-0 transform -translate-x-1/2 -translate-y-1/2 -rotate-45"
                          />
                        </div>
                      ) : (
                        <img
                          src={item.imageURL}
                          alt="Profile"
                          className="w-[55px] h-[55px] mask mask-squircle"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      <div className="flex flex-col ml-4">
                        <h3 className="text-xl">{item.name}</h3>
                      </div>
                    </td>
                    <td className="text-center">
                      <h3>{item.bench}</h3>
                    </td>
                    <td className="text-center">
                      <h3>{item.squat}</h3>
                    </td>
                    <td className="text-center">
                      <h3>{item.deadlift}</h3>
                    </td>
                    <td className="text-center">
                      <h3>{item.total}</h3>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
