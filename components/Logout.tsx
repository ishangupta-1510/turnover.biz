"use client";
import {useRouter} from "next/navigation";

export default function Logout() {
  const router = useRouter();
  async function handleLogout() {
    try {
      await fetch("/api/logout", {
        method: "POST",
      });
      router.replace("/register");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <button onClick={handleLogout} className="hover:underline">
      Logout
    </button>
  );
}
