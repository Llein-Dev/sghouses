// src/components/MotionWrapper.js

"use client";

import { motion, AnimatePresence } from "framer-motion";

const MotionWrapper = ({ children, animationType = "fade", motionKey }) => {
    const variants = {
        fade: {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
        },
        slide: {
            initial: { x: "100%", opacity: 0 },
            animate: { x: 0, opacity: 1 },
            exit: { x: "-100%", opacity: 0 },
        },
        scale: {
            initial: { scale: 0.8, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.8, opacity: 0 },
        },
        rotate: {
            initial: { rotate: 10, opacity: 0 },
            animate: { rotate: 0, opacity: 1 },
            exit: { rotate: -10, opacity: 0 },
        },
        flip: {
            initial: { rotateY: 90, opacity: 0 },
            animate: { rotateY: 0, opacity: 1 },
            exit: { rotateY: -90, opacity: 0 },
        },
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={motionKey} // Renamed from 'key' to 'motionKey' to avoid conflict
                initial={variants[animationType].initial}
                animate={variants[animationType].animate}
                exit={variants[animationType].exit}
                transition={{ duration: 0.5 }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default MotionWrapper;
