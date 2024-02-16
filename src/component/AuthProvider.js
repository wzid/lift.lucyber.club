"use client"

import React, { useState, useEffect } from "react";

import { auth, db } from "../service/FirebaseService";
import { ref, set, get } from "firebase/database";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);

      if (!(currentUser === null || currentUser === undefined)) {
        const userRef = ref(db, "users/" + currentUser.uid);

        get(userRef).then((snapshot) => {
          let userData;

          if (snapshot.exists()) {
            userData = snapshot.val();

            userData.imageURL = currentUser.providerData[0].photoURL.slice(0, -6);
          } else {
            userData = {
              name: currentUser.providerData[0].displayName,
              imageURL: currentUser.providerData[0].photoURL.slice(0, -6),
              deadlift: 0,
              bench: 0,
              squat: 0
            };
          }

          set(userRef, userData);
        });
      }
    });
  }, [currentUser]);

  const value = { currentUser, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
