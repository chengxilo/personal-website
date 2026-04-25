'use client'

import {motion} from "motion/react";
import React from "react";

const fadeUp = {
    initial: {opacity: 0, y: 16},
    whileInView: {opacity: 1, y: 0},
    viewport: {once: true, margin: '-80px'},
    transition: {duration: 0.5, ease: 'easeOut' as const},
};

export default function FadeSection({id, children}: { id?: string; children: React.ReactNode }) {
    return (
        <motion.section id={id} {...fadeUp}>
            {children}
        </motion.section>
    );
}
