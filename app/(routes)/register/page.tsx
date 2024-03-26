"use client";

import Input from "@/components/ui/Input";
import Link from "next/link";
import {useRouter} from "next/navigation";
import React, {useState} from "react";

function SignIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [typePassword, setTypePassword] = useState("password");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<EventTarget>) {
    e.preventDefault();
    let userData = {
      name,
      email,
      password,
    };
    try {
      setIsLoading(true);
      const res = await fetch("/api/sign-up", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (data) {
        router.push("/verify_email");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
    // Make call to backend to create user
  }

  function handlePasswordToggle() {
    if (typePassword === "password") {
      setTypePassword("text");
    } else {
      setTypePassword("password");
    }
  }
  return (
    <div className="w-full flex items-center justify-center p-3 mt-4 box-border">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4 h-[691px] w-[576px] rounded-[20px] border-[1px] border-[#C1C1C1] space-y-10 flex flex-col items-center"
      >
        <h2 className="text-center text-[32px] font-[600]">
          Create your account
        </h2>
        <Input
          label="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Input
          label="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <Input
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          isPasswordInput={true}
        />

        <div className="flex items-center justify-between">
          <button
            className="bg-black text-white  p-2 rounded-md uppercase w-[456px] disabled:opacity-85"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Account"}
          </button>
        </div>
        <div>
          <Link
            href="/login"
            className="text-center text-[16px] font-[400] hover:underline"
          >
            Have an Account? <span className="font-[500]">LOGIN</span>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
