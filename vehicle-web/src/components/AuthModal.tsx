'use client'
import React from 'react'
import { motion } from 'motion/react'
type propType = {
    open: boolean,
    onClose: () => void
}

function AuthModal({ open, onClose }: propType) {
    return (
        <>
            {open && <>
                <motion.div
                    initial={{
                        opacity: 0

                    }}
                    animate={{
                        opacity: 1,

                    }}
                    onClick={onClose}
                    className='fixed inset-0 z-[90] bg-black/80 backdrop-blur-md'
                >
                    <motion.div
                        initial={{
                            scale: 0.5,
                            opacity: 0
                        }}
                        animate={{
                            scale: 1,
                            opacity: 1
                        }}
                        className='fixed'
                    >
                        <h2>Auth Modal</h2>
                    </motion.div>

                </motion.div>
            </>}
        </>
    )
}

export default AuthModal