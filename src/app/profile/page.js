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

  function showAlert(type, message) {
    if (type === "success") {
      let icon = `<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
      document.getElementById("alert-success").style.visibility = "visible";
      document.getElementById("alert-success").innerHTML = `${icon} <p>${message}</p>`;
      setTimeout(() => {document.getElementById("alert-success").style.visibility = "hidden";}, 3000);
    } else if (type === "error") {
      console.log("Error: ", message);
      document.getElementById("alert-error").style.visibility = "visible";
      let icon = `<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
      document.getElementById("alert-error").innerHTML = `${icon} <p>${message}</p>`;
      setTimeout(() => {document.getElementById("alert-error").style.visibility = "hidden";}, 3000);
    }
  }

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
      showAlert("error", "Please enter a number");
    } else if (bench > 1000) {
      showAlert("don't lie about your bench")
    } else if (squat > 1000) {
      showAlert("don't lie about your squat")
    } else if (deadlift > 1000) {
      showAlert("error", "don't lie about your deadlift");
    } else if (name.length >= 28) {
      showAlert("error", "Name too long");
    } else if (bench < 0 || squat < 0 || deadlift < 0) {
      showAlert("error", "How are you lifting negative weight?");
      console.log(bench, squat, deadlift);
    } else {
      get(userRef).then((snapshot) => {
        let userData;

        if (snapshot.exists()) {
          userData = snapshot.val();
          userData.name = name;
          // We remove the last 6 characters so that the photo is full resolution
          userData.imageURL = currentUser.providerData[0].photoURL.slice(0, -6);
          userData.deadlift = parseInt(deadlift);
          userData.squat = parseInt(squat);
          userData.bench = parseInt(bench);
        } else {
          userData = {
            name: name,
            imageURL: currentUser.providerData[0].photoURL.slice(0, -6),
            bench: parseInt(bench),
            squat: parseInt(squat),
            deadlift: parseInt(deadlift),
          };
        }

        set(userRef, userData);

        showAlert("success", "Profile Saved");
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
        id="alert-success"
        role="alert"
        style={{ visibility: "hidden" }}
        className="alert alert-success mt-10"
      >
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        Profile Saved
      </div>
      <div
        id="alert-error"
        role="alert"
        style={{ visibility: "hidden" }}
        className="alert alert-error mt-10"
      >
        
        Error
      </div>
    </div>
  );
}
