"use client"

import LoadingPageComponent from "@/components/LoadingPageComponent";
import SignInWithGoogle from "@/components/LoginComponents/SignInWithGoogle";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [isClientPage, setIsClientPage] = useState<boolean>(false);

  useEffect(() => {
    setIsClientPage(true)
  }, []);


  if (!isClientPage) {
    return (
      <LoadingPageComponent />
    )
  }

  return (
    <div className="w-full h-full min-h-screen bg-gradient-to-bl from-[#1E1F26] to-[#363058] px-10 py-20 flex items-center justify-center">
      <div className="max-w-screen-sm mx-auto">
        <div className="w-full rounded-xl px-10 py-10 text-white text-center">
          <div className="mb-8 flex flex-col items-center">
            <div className="flex items-center justify-center mb-4 bg-white shadow-md rounded-full h-[160px] w-[160px]">
              <Image
                // className="dark:invert"
                src="/note.png"
                alt="Next.js logo"
                width={100}
                height={100}
                priority
              />
            </div>
            <h2 className="text-4xl font-bold mb-3">Atur List Kegiatan Lu</h2>
            <p className="text-slate-300 text-lg">Disini lu cuma bisa login page google, jangan ngelunjak.</p>
          </div>

          <SignInWithGoogle />
        </div>
      </div>
    </div>
  );
}
