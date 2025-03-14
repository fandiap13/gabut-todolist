import { StatusType } from '@/services/task/task';
import { motion } from 'framer-motion';
import React from 'react'
import { IconType } from 'react-icons';

interface SummaryCardProps {
    title: string;
    amount: number;
    Icon: IconType;
    onClick: (title: string) => void;
    status: StatusType | string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, amount, Icon, onClick, status }) => {
    return (
        <motion.div
            onClick={() => onClick(title.toLowerCase())}
            whileHover={{ scale: 1.05 }}
            className={`w-full ${status == title.toLowerCase() ? "scale-105 bg-blue-600 text-white shadow-2xl" : "bg-white/20 hover:bg-white/30"} transition-all backdrop-blur-lg rounded-3xl p-5 cursor-pointer`}
        >
            <div className="w-auto">
                <div className="inline-block bg-white p-2 rounded-full">
                    <Icon className="w-8 h-8 text-blue-600" />
                </div>
            </div>
            <div className="flex items-end justify-between mt-6">
                <div className="text-lg font-medium">{title}</div>
                <div className="text-5xl font-bold">{amount}</div>
            </div>
        </motion.div>
    )
}

export default SummaryCard