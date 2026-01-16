"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Button from "./Button";

interface ComingSoonModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ComingSoonModal = ({ isOpen, onClose }: ComingSoonModalProps) => {
    const t = useTranslations("HomePage.hero"); // Reusing translations if possible or adding new ones
    const locale = useLocale();

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl overflow-hidden"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <X className="w-6 h-6 text-gray-500" />
                        </button>

                        <div className="flex flex-col items-center text-center">
                            {/* Icon/Illustration */}
                            <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mb-6">
                                <svg
                                    className="w-10 h-10 text-red-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                Coming Soon!
                            </h3>
                            <p className="text-gray-600 mb-8 max-w-[280px]">
                                Our mobile app is currently in development and will be launching soon. Join our waitlist to be the first to know!
                            </p>

                            <Link href={`/${locale}/waitlist`} passHref className="w-full">
                                <Button
                                    type="button"
                                    style="danger"
                                    css="w-full h-14 rounded-full font-bold text-lg"
                                    fn={onClose}
                                >
                                    Join the Waitlist
                                </Button>
                            </Link>

                            <button
                                onClick={onClose}
                                className="mt-4 text-gray-500 hover:text-gray-700 font-medium transition-colors"
                            >
                                Maybe later
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ComingSoonModal;
