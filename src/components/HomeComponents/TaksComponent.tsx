import React, { useState } from 'react'
import { CiMenuKebab } from 'react-icons/ci'
import { FaRegTrashAlt } from 'react-icons/fa'
import { IoCalendarClear, IoTime } from 'react-icons/io5'

interface TaksComponentProps {
    isActive: boolean;
    onCheck: () => void;
    date: string;
    time: string;
    title: string;
}

const TaksComponent: React.FC<TaksComponentProps> = ({ date, isActive, onCheck, time, title }) => {
    const [isActiveCheck, setIsActiveCheck] = useState(isActive);

    const handleCheckboxChange = () => {
        setIsActiveCheck(prev => !prev);
    };

    return (
        <div className={`w-full ${isActive ? "bg-blue-600" : "bg-white/10"} shadow-md px-4 py-3 rounded-lg flex items-center justify-between gap-x-4 transition-all`}>
            <div className="inline-flex items-center">
                <label className="flex items-center cursor-pointer relative">
                    <input
                        type="checkbox"
                        className={`peer h-[30px] w-[30px] cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border ${isActive ? "border-blue-600 checked:bg-white checked:border-white" : "border-slate-300 checked:bg-blue-600 checked:border-blue-600"}`}
                        checked={isActiveCheck}
                        onChange={(e) => {
                            e.preventDefault();
                            handleCheckboxChange();
                        }} />
                    <span className={`absolute ${isActive ? "text-blue-600" : "text-white"} opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                    </span>
                </label>
            </div>

            <div className="flex-1">
                <div className="flex items-center font-light gap-x-3 mb-2">
                    <div className="flex items-center justify-center gap-x-1">
                        <IoCalendarClear className="w-4 h-4" />
                        <span>{date}</span>
                    </div>
                    <div className="flex items-center justify-center gap-x-1">
                        <IoTime className="w-4 h-4" />
                        <span>{time}</span>
                    </div>
                </div>
                <span className="font-medium text-lg">{title}</span>
            </div>

            <div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="cursor-pointer"><CiMenuKebab className="w-6 h-6" /></div>
                    <ul tabIndex={0} className="dropdown-content menu bg-white text-bgdark rounded-box z-1 w-[100px] p-1 shadow-sm">
                        <li><div><FaRegTrashAlt className="w-4 h-4" /> <span>Delete</span></div></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TaksComponent