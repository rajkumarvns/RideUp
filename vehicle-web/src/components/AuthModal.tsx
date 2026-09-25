'use client'
import React, { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Lock, Mail, X, User } from 'lucide-react'
import Image from 'next/image'
import axios from 'axios'
type propType = {
    open: boolean,
    onClose: () => void
}
type stepType = "login" | "signup" | "otp"
function AuthModal({ open, onClose }: propType) {
    const [step, setStep] = useState<stepType>("login")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const handleSignUp = async () => {
        try {
            const { data } = await axios.post("/api/auth/register", { name, email, password })
            console.log(data)
        } catch (error: any) {
            console.log(error?.response?.data?.message || "")
        }
    }
    return (
        <AnimatePresence>
            {open && <>
                <motion.div
                    initial={{
                        opacity: 0

                    }}
                    animate={{
                        opacity: 1,

                    }}
                    exit={{
                        opacity: 0,

                    }}
                    className='fixed inset-0 z-[90] bg-black/80 backdrop-blur-md'
                >
                    <motion.div
                        initial={{
                            scale: 0.95,
                            opacity: 0,
                            y: 40
                        }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            y: 0
                        }}
                        transition={{
                            duration: 0.35, ease: "easeOut"
                        }}
                        exit={{
                            scale: 0.95,
                            opacity: 0,
                            y: 40
                        }}
                        className='fixed inset-0 z-[100] flex items-center justify-center px-4'
                    >
                        <div className='relative w-full max-w-md rounded-3xl bg-white border border-black/10 shadow-[0_40px_100px_rgba(0,0,0,0.35)] p-6 sm:p-5 text-black'>
                            <div className='absolute right-4 top-4 text-gray-500 hover:text-black transition' onClick={onClose}>
                                <X size={20} />
                            </div>

                            <div className='mb-6 text-center'>

                                <h1 className='text-3xl font-extrabold tracking-widest'>RideUp</h1>
                                <p className='mt-1 test-xs text-gray-500'>Book Your Ride</p>

                            </div>
                            <button className='w-full h-11 rounded-xl border border-black/20 flex items-center justify-center gap-3 text-sm font-semibold hover:text-white hover:bg-black/90 transition-all duration-300' >

                                <Image src={"/gImage.avif"} alt='google' width={20} height={20} />
                                <span className=''>Continue With Google</span>
                            </button>

                            <div className='flex items-center gap-4 my-6'>
                                <div className='flex-1 h-px bg-black/10' />
                                <div className='text-xs text-gray-500'>OR</div>


                                <div className='flex-1 h-px bg-black/10' />
                            </div>
                            <div >
                                {step == "login" && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                    >
                                        <h1 className='text-xl font-semibold'>Welcome back</h1>
                                        <div className='mt-5 space-y-4'>
                                            <div className='flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3'>
                                                <Mail size={18} className='text-gray-500' />
                                                <input type="email" placeholder='email'
                                                    className='w-full bg-transparent outline-none text-sm '
                                                />

                                            </div>
                                            <div className='flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3'>
                                                <Lock size={18} className='text-gray-500' />
                                                <input type="password" placeholder='password'
                                                    className='w-full bg-transparent outline-none text-sm '
                                                />

                                            </div>
                                            <button className='w-full h-11 rounded-xl bg-black text-white text-sm font-semibold hover:bg-black/90 transition-all duration-300'>Login</button>
                                            <p className='text-sm text-gray-500 text-center'>Don't have an account? <span className='text-black cursor-pointer font-semibold hover:underline' onClick={() => setStep('signup')}>Sign up</span></p>
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            <div >
                                {step == "signup" && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                    >
                                        <h1 className='text-xl font-semibold'>Create Account</h1>
                                        <div className='mt-5 space-y-4'>
                                            <div className='flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3'>
                                                <User size={18} className='text-gray-500' />
                                                <input type="text" placeholder='Full Name'
                                                    className='w-full bg-transparent outline-none text-sm '
                                                    onChange={(e) => setName(e.target.value)}
                                                    value={name}
                                                />

                                            </div>
                                            <div className='flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3'>
                                                <Mail size={18} className='text-gray-500' />
                                                <input type="email" placeholder='email'
                                                    className='w-full bg-transparent outline-none text-sm '
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    value={email}
                                                />

                                            </div>
                                            <div className='flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3'>
                                                <Lock size={18} className='text-gray-500' />
                                                <input type="password" placeholder='password'
                                                    className='w-full bg-transparent outline-none text-sm '
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    value={password}
                                                />

                                            </div>
                                            <button className='w-full h-11 rounded-xl bg-black text-white text-sm font-semibold hover:bg-black/90 transition-all duration-300' onClick={handleSignUp}>Sign up</button>
                                            <p className='text-sm text-gray-500 text-center'>Already have an account? <span className='text-black cursor-pointer font-semibold hover:underline' onClick={() => setStep('login')}>Login</span></p>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>

                </motion.div>
            </>}
        </AnimatePresence>
    )
}

export default AuthModal