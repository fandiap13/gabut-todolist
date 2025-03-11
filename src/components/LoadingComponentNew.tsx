import React from "react";
import { FaCircleNotch } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingComponentNewProps {
    loading?: boolean;
    title?: string;
}

const LoadingComponentNew: React.FC<LoadingComponentNewProps> = ({
    loading = false,
    title,
}) => {
    return (
        <div
            className={`w-full h-full fixed top-0 left-0 right-0 bottom-0 bg-slate-950/70 z-[9999] flex items-center justify-center ${!loading && "hidden"
                }`}
        >
            <AnimatePresence>
                {loading && (
                    <motion.div
                        className="bg-white py-8 px-12 rounded-lg flex flex-col items-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <FaCircleNotch className="h-14 w-14 animate-spin text-primary/80" />
                        <h3 className="text-slate-800 font-semibold text-lg mt-3">
                            {title ?? "Tunggu Proses..."}
                        </h3>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LoadingComponentNew;