"use client";

import { saveUser } from "@/actions";
import clsx from "clsx";
import React, { useState } from "react";
import { useFormStatus } from "react-dom";

export const LeftPanel = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  const ShowButtonPending = () => {
    const { pending } = useFormStatus();
    if (pending) {
      return <div>Cargando...</div>;
    }

    return (
      <button className="fade-in bg-gradient-to-t from-red-400 to-green-400 p-3 text-white font-bold">
        Sign Up
      </button>
    );
  };

  const signUpUser = async (formData: FormData) => {
    const { ok, error, message } = await saveUser(formData);

    if (!ok) {
      alert(`no se pudo crear el usuario ${error} ${message}`);
    } else {
      alert(`usuario creado ${message}`);
    }

    console.log("signUpUser", { formData });
  };

  return (
    <div className="flex p-4 justify-center flex-col align-middle">
      <span className="text-center mb-4 font-extrabold">
        Please toggle the button to see the view
      </span>
      <div className="flex gap-5 justify-center mb-4">
        <button
          onClick={() => setIsLoginView(true)}
          className={clsx("border-solid border-2 font-bold py-2 px-4 rounded", {
            "btn-primary": isLoginView,
          })}
        >
          Sign In
        </button>
        <button
          onClick={() => setIsLoginView(false)}
          className={clsx("border-solid border-2 font-bold py-2 px-4 rounded", {
            "btn-primary": !isLoginView,
          })}
        >
          Sign Up
        </button>
      </div>

      {isLoginView ? (
        <div className="flex flex-col">
          <span className="text-center mb-5 font-bold">Login Form</span>
          <form className="flex flex-col gap-4">
            <input
              type="email"
              className="border rounded-md p-2 focus-within:outline-green-400"
              placeholder="Email"
            />
            <input
              type="password"
              className="border  rounded-md p-2 focus-within:outline-green-400"
              placeholder="Passsword"
            />
            <button className=" bg-gradient-to-t from-red-400 to-green-400 p-3 text-white font-bold">
              Sign In
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col">
          <span className="text-center mb-5 font-bold">
            Fill your detail to add user
          </span>
          <form
            className="flex flex-col gap-4"
            action={(formData) => signUpUser(formData)}
          >
            <input
              type="text"
              className="border rounded-md p-2 focus-within:outline-green-400"
              placeholder="Username"
              name="username"
            />
            <input
              type="password"
              className="border rounded-md p-2 focus-within:outline-green-400"
              placeholder="Password"
              name="password"
            />
            <input
              type="email"
              className="border rounded-md p-2 focus-within:outline-green-400"
              placeholder="Email"
              name="email"
            />
            <input
              type="text"
              className="border  rounded-md p-2 focus-within:outline-green-400"
              placeholder="Phone"
              name="phoneNumber"
            />

            <ShowButtonPending />
          </form>
        </div>
      )}
    </div>
  );
};
