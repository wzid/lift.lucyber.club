"use client";

import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../component/AuthProvider";

import { db } from "../../service/FirebaseService";
import { ref, set, get } from "firebase/database";
import { auth } from "../../service/FirebaseService";
import { Icon } from "@iconify/react";

export default function Profile() {
  const { currentUser } = useContext(AuthContext);

  const [profileURL, setProfileURL] = useState("https://placehold.co/300");
  const [name, setName] = useState("");
  const [bench, setBench] = useState("");
  const [squat, setSquat] = useState("");
  const [deadlift, setDeadlift] = useState("");

  const userRef = ref(db, "users/" + currentUser?.uid);

  useEffect(() => {
    if (currentUser === null || currentUser === undefined) {
      return;
    }

    get(userRef)
      .then((snapshot) => {
        let userData;

        // If the user exists then use the data from the database
        if (snapshot.exists()) {
          userData = snapshot.val();
        } else {
          // Otherwise make data for them and set it in the database
          userData = {
            name: currentUser.providerData[0].displayName,
            // We remove the last 6 characters so that the photo is full resolution
            imageURL: currentUser.providerData[0].photoURL.slice(0, -6),
            bench: 0,
            deadlift: 0,
            squat: 0,
          };

          // Update the database
          set(userRef, userData);
        }

        setName(userData.name);
        setProfileURL(userData.imageURL);
        setBench(userData.bench);
        setDeadlift(userData.deadlift);
        setSquat(userData.squat);
      })
      .catch((e) => {
        console.error("Error getting user information.", e);
      });

    // Don't add `userRef` here. For some reason it messes up the text box
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (bench === undefined || deadlift === undefined || squat === undefined) {
      document.getElementById("alert").style.background = "#FF375F";
      document.getElementById(
        "alert"
      ).innerHTML = `<i class="mr-2 fa-solid fa-triangle-exclamation"></i>Enter a value for squat, deadlift, and bench`;
      document.getElementById("alert").style.visibility = "visible";
      setTimeout(() => {
        document.getElementById("alert").style.visibility = "hidden";
      }, 3000);
    }

    if (bench > 1000 || squat > 1000 || deadlift > 1000) {
      document.getElementById("alert").style.background = "#FF375F";
      document.getElementById(
        "alert"
      ).innerHTML = `<i class="mr-2 fa-solid fa-triangle-exclamation"></i>Stop lying smh`;
      document.getElementById("alert").style.visibility = "visible";
      setTimeout(() => {
        document.getElementById("alert").style.visibility = "hidden";
      }, 3000);
    }

    if (name.length >= 28) {
      document.getElementById("alert").style.background = "#FF375F";
      document.getElementById(
        "alert"
      ).innerHTML = `<i class="mr-2 fa-solid fa-triangle-exclamation"></i>Name must be less than 28 characters`;
      document.getElementById("alert").style.visibility = "visible";
      setTimeout(() => {
        document.getElementById("alert").style.visibility = "hidden";
      }, 3000);
    } else {
      get(userRef).then((snapshot) => {
        let userData;

        if (snapshot.exists()) {
          userData = snapshot.val();
          userData.name = name;
          // We remove the last 6 characters so that the photo is full resolution
          userData.imageURL = currentUser.providerData[0].photoURL.slice(0, -6);
          userData.deadlift = deadlift;
          userData.squat = squat;
          userData.bench = bench;
        } else {
          userData = {
            name: name,
            imageURL: currentUser.providerData[0].photoURL.slice(0, -6),
            bench: bench,
            squat: squat,
            deadlift: deadlift,
          };
        }

        set(userRef, userData);

        document.getElementById("alert").style.background = "#43a047";
        document.getElementById("alert").innerHTML = `<i class="mr-2 fa-solid fa-check"></i>Profile Saved`;
        document.getElementById("alert").style.visibility = "visible";
        setTimeout(() => {
          document.getElementById("alert").style.visibility = "hidden";
        }, 3000);
      });
    }
  };

  const signOut = () => {
    auth.signOut();
    window.location.reload(false);
    window.location.replace("/");
  };

  return (
    <div className="flex flex-col w-full items-center font-sans mt-12 bg-background">
      {!(currentUser === null || currentUser === undefined) && (
        <div className="flex flex-col items-center md:items-start md:flex-row w-full">
          <img
            src={profileURL}
            alt="Placeholder User"
            className="rounded-full w-[200px] h-[200px] lg:w-[250px] lg:h-[250px]"
            referrerPolicy="no-referrer"
          />

          <form onSubmit={handleSubmit} className="md:ml-8 lg:ml-12 mt-6 lg:mt-12 w-full">
            <div className="flex flex-col">
              <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
                <div className="flex flex-col grow">
                  <label htmlFor="name" className="font-bold text-xl md:text-2xl mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="placeholder:text-foreground/60 text-foreground h-12 text-base lg:text-lg p-3 rounded-lg border border-background-600 bg-background-800"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </div>

                <div className="flex flex-col grow">
                  <label htmlFor="bench" className="font-bold text-xl md:text-2xl mb-2">
                    Bench
                  </label>
                  <input
                    type="number"
                    placeholder={255}
                    className="placeholder:text-foreground/60 text-foreground h-12 text-base lg:text-lg p-3 grow rounded-lg border border-background-600 bg-background-800"
                    onChange={(e) => setBench(e.target.value)}
                    value={bench}
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-8 lg:gap-12 mt-6">
                <div className="flex flex-col grow">
                  <label htmlFor="squat" className="font-bold text-xl md:text-2xl mb-2">
                    Squat
                  </label>
                  <input
                    type="number"
                    placeholder={255}
                    className="placeholder:text-foreground/60 text-foreground h-12 text-base lg:text-lg p-3 grow rounded-lg border border-background-600 bg-background-800"
                    onChange={(e) => setSquat(e.target.value)}
                    value={squat}
                  />
                </div>

                <div className="flex flex-col grow">
                  <label htmlFor="deadlift" className="font-bold text-xl md:text-2xl mb-2">
                    Deadlift
                  </label>
                  <input
                    type="number"
                    placeholder={255}
                    className="placeholder:text-foreground/60 text-foreground h-12 text-base lg:text-lg p-3 grow rounded-lg border border-background-600 bg-background-800"
                    onChange={(e) => setDeadlift(e.target.value)}
                    value={deadlift}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row text-xl mt-[2rem] space-y-8 md:space-y-0 md:space-x-8">
              <button type="submit" className="btn btn-lg btn-green gap-2">
                <Icon width="24" height="24" icon="lets-icons:save-fill" />
                Save Changes
              </button>
              <button type="button" className="btn btn-lg btn-default gap-4" onClick={signOut}>
                Sign Out
                <Icon width="22" height="22" icon="solar:exit-bold-duotone" />
              </button>
            </div>
          </form>
        </div>
      )}
      <div
        id="alert"
        className="w-fit mt-12 text-text_color font-bold text-base lg:text-lg pt-2 pb-1 px-2 rounded-lg invisible"
      >
        Profile Saved
      </div>
    </div>
  );
}
