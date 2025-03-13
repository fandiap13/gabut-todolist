import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { IoTime } from 'react-icons/io5'
import SummaryCard from './SummaryCard'
import TaksComponent from './TaksComponent'
import LoadingPageComponent from '../LoadingPageComponent'
import { FaPlus } from 'react-icons/fa6';
import { prisma } from '@/lib/prisma';
import Navbar from '../LayoutComponents/Navbar'

const BodyHome = () => {
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
            <Navbar />

            <div className="max-w-screen-xl mx-auto px-10 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-6">
                    <div className="w-full grid grid-cols-2 gap-4">
                        <SummaryCard title="Today" amount={100} Icon={IoTime} />
                        <SummaryCard title="Schedule" amount={100} Icon={IoTime} />
                        <SummaryCard title="Important" amount={100} Icon={IoTime} />
                        <SummaryCard title="All" amount={100} Icon={IoTime} />
                    </div>

                    <div>
                        <div className='flex items-center justify-between'>
                            <h3 className="text-2xl font-semibold">Today's Tasks</h3>
                            <button className="btn btn-primary"
                                onClick={() => {
                                    // if (document?.getElementById('my_modal_5')) {
                                    //     document.getElementById('my_modal_5').showModal();
                                    // }
                                }}>
                                <FaPlus className='w-5 h-5 mr-1' /> open modal
                            </button>
                        </div>
                        <div className="mt-8 flex flex-col gap-3">
                            <TaksComponent title="Pegawai baru" date="Today" time="10:00" isActive={true} onCheck={() => { }} />
                            <TaksComponent title="Pegawai baru" date="Today" time="10:00" isActive={false} onCheck={() => { }} />
                            <TaksComponent title="Pegawai baru" date="Today" time="10:00" isActive={false} onCheck={() => { }} />
                            <TaksComponent title="Pegawai baru" date="Today" time="10:00" isActive={false} onCheck={() => { }} />
                        </div>
                    </div>
                </div>
            </div>


            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <div className='py-4'>
                        <input type="text" placeholder="Type here" className="input w-full" />
                    </div>
                    {/* if there is a button in form, it will close the modal */}
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </main>
    )
}

export default BodyHome