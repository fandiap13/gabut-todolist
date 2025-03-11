"use client";

import SummaryCard from "@/components/HomeComponents/SummaryCard";
import TaksComponent from "@/components/HomeComponents/TaksComponent";
import LoadingPageComponent from "@/components/LoadingPageComponent";
import { useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoCalendarClear, IoLogOut, IoTime, IoTimeOutline } from "react-icons/io5";

export default function Home() {
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
    <main className="w-full h-full min-h-screen bg-gradient-to-bl from-[#1E1F26] to-[#363058] text-white">
      <div className="flex items-center justify-between bg-white/10 backdrop-blur-lg px-8 py-6 rounded-b-2xl">
        <h1 className="text-4xl font-semibold">
          Halo, Fandi
        </h1>

        <div className="flex items-center justify-center">
          <IoLogOut className="w-8 h-8 mr-2" />
          <span className="font-medium text-lg">Sign Out</span>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-10 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-6">
          <div className="w-full grid grid-cols-2 gap-4">
            <SummaryCard title="Today" amount={100} Icon={IoTime} />
            <SummaryCard title="Schedule" amount={100} Icon={IoTime} />
            <SummaryCard title="Important" amount={100} Icon={IoTime} />
            <SummaryCard title="All" amount={100} Icon={IoTime} />
          </div>

          <div>
            <h3 className="text-2xl font-semibold">Today's Tasks</h3>
            <div className="mt-4 flex flex-col gap-3">
              <TaksComponent title="Pegawai baru" date="Today" time="10:00" isActive={true} onCheck={() => { }} />
              <TaksComponent title="Pegawai baru" date="Today" time="10:00" isActive={false} onCheck={() => { }} />
              <TaksComponent title="Pegawai baru" date="Today" time="10:00" isActive={false} onCheck={() => { }} />
              <TaksComponent title="Pegawai baru" date="Today" time="10:00" isActive={false} onCheck={() => { }} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
