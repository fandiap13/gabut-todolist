import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import LoadingProcessComponent from '../LoadingProcessComponent';
import Swal from 'sweetalert2';

const SignInWithGoogle = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleLoginGoogle = async () => {
        try {
            setIsLoading(true);
            await signIn("google", { redirectTo: "/" });
            setIsLoading(false);
        } catch (error) {
            console.error("Sign in failed:", error);
            Swal.fire({
                title: 'Sign In Failed!',
                text: error ? error.toString() : "Internal server error!",
                icon: 'error',
            });
            setIsLoading(false);
        }
    }

    return (
        <form
            action={handleLoginGoogle}
        >
            <button type="submit" className="bg-white/20 hover:bg-white/30 transition-all backdrop-blur-lg px-6 py-2 rounded-xl cursor-pointer font-semibold min-w-[400px] max-w-full">
                <div className="flex items-center justify-center">
                    <Image
                        src="/google-logo.png"
                        alt="Logo Google"
                        width={50}
                        height={50}
                    />
                    <span>Sign In With Google</span>
                </div>
            </button>

            <LoadingProcessComponent loading={isLoading} />
        </form>
    )
}

export default SignInWithGoogle