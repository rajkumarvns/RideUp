"use client"
import React, { useState } from 'react'
import { motion } from "motion/react"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import AuthModal from './AuthModal'
const NavItems = ["Home", "About", "Services", "Contact", "Pricing"]
function Nav() {
    const pathName = usePathname()
    const[authOpen, setAuthOpen] = useState(false)
    return (
        <>
        <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}

            className={`fixed top-3 left-1/2 -translate-x-1/2 w-[85%] md:w-[60%] lg:w-[50%] z-50 rounded-full bg-[#0B0B0B] text-white shadow-[0_15px_50px_rgba(0,0,0,0.7)]`}
        >
            {/* Left: Logo */}
            <div className='max-w-8xl mx-auto px-4 md:px-8 flex items-center justify-between py-0.2'>
                <Image src={"/logo.jpg"} alt='logo' width={44} height={44} property='' />
                <div className="flex items-center gap-4 md:gap-8 overflow-x-auto no-scrollbar whitespace-nowrap">
                    {NavItems.map((item, index) => {
                        let href;
                        let active;
                        if (item === "Home") {
                            href = `/`
                            active = href == pathName

                        } else {
                            href = `/${item.toLowerCase()}`
                            active = href == pathName
                        }
                        return (
                            <Link key={index} href={href} className={`text-sm font-medium transition ${active ? "text-white" : "text-gray-400 hover:text-white"}`}>
                                {item}
                            </Link>
                        )
                    })}
                </div>
                <button className='px-4 py-1.5 rounded-full bg-white text-black text-sm'
                onClick={() => setAuthOpen(true)}
                >
                    LogIn
                </button>
            </div>





        </motion.div>
                <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        />
        </>
    )
}

export default Nav