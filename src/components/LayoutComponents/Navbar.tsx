import { motion } from 'framer-motion';
import { signOut, useSession } from 'next-auth/react';
import React, { useState } from 'react'
import { IoLogOut } from 'react-icons/io5';
import Swal from 'sweetalert2';
import LoadingProcessComponent from '../LoadingProcessComponent';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const handleLogout = async () => {
        Swal.fire({
            title: "Log Out?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Logout!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                setIsLoading(true);
                try {
                    await signOut(); // Attempt to sign in
                } catch (error) {
                    console.error("Sign Out failed:", error);
                    router.push("/auth/login");
                    // Swal.fire({
                    //     title: 'Sign Out Failed!',
                    //     text: error ? error.toString() : "Internal server error!",
                    //     icon: 'error',
                    // })
                } finally {
                    setIsLoading(false);
                }
            }
        });
    }

    const { data } = useSession();

    return (
        <div className="flex items-center px-8 h-[80px] justify-between">
            <h1 className="text-2xl font-semibold">
                {data?.user?.name || "No User Broh"}
            </h1>

            <motion.button
                className="flex items-center justify-center cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={handleLogout}
            >
                <IoLogOut className="w-8 h-8 mr-2" />
                <span className="font-medium text-lg">Sign Out</span>
            </motion.button>

            <LoadingProcessComponent loading={isLoading} />
        </div>
    )
}

export default Navbar