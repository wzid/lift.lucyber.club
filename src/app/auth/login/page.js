"use client";

// import React, { useContext } from "react";

// import { AuthContext } from "../../component/auth/AuthProvider";
// import firebase from "firebase/compat/app";
// import firebase from "firebase/app";
import { useRouter } from "next/navigation";
import { auth } from "../../../service/FirebaseService";

import signInWithGoogle from "../signin";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();
  const handleSignInWithGoogle = async () => {
    setIsLoading(true);
    setError(null);

    const { result, error } = await signInWithGoogle();

    setIsLoading(false);

    if (error) {
      setError(error.message);
    } else {
      router.push("/profile");
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("/profile");
      }
    });
    return unsubscribe;
  }, []);

  return (
    <div className="flex flex-col w-full items-center font-sans pb-12">
      <h1 className="pb-8">Sign in</h1>
      <button
        type="button"
        onClick={handleSignInWithGoogle}
        className="btn btn-blue btn-lg gap-2"
      >
          <Icon icon="fa6-brands:google" />
          Sign in with Google
      </button>
      {error ? (<p>{error}</p>) : <p></p>}
    </div>
  );
};

export default Login;
