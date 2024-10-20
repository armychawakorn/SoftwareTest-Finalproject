'use client'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react';

export default function Nav() {
    const { data: session } = useSession()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-gray-800 text-white border-b border-gray-700">
            <div className="container mx-auto px-4 flex flex-wrap items-center justify-between py-2">
                <div className="flex items-center">
                    <Image src="https://th.kku.ac.th/wp-content/uploads/2019/11/LogoKKUthai_150px.png" width={32} height={32} alt='Logo' />
                    <span className="text-lg ml-2 md:ml-4 font-bold">Software Test</span>
                </div>

                <button className="block md:hidden focus:outline-none" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                        {isMobileMenuOpen ? (
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                        ) : (
                            <path d="M3 12h18M3 6h18M3 18h18" />
                        )}
                    </svg>
                </button>

                <div className={`w-full md:w-auto md:flex md:items-center ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
                    <ul className="flex flex-col p-4 mt-4 border border-gray-700 rounded-lg bg-gray-700 md:flex-row md:space-x-2 gap-5 md:gap-0 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-gray-800">
                        <li>
                            <Link href="/" className="">
                                <button className="bg-blue-500 hover:bg-blue-600 py-2 px-3 rounded-md">หน้าหลัก</button>
                            </Link>
                        </li>
                        {session?.user?.email ? (
                            <>
                                <li>
                                    <Link href="/dashboard">
                                        <button className="bg-blue-500 hover:bg-blue-600 py-2 px-3 rounded-md">สวัสดี, {session.user.email}</button>
                                    </Link>
                                </li>
                                <li>
                                    <button className="bg-blue-500 hover:bg-blue-600 py-2 px-3 rounded-md" onClick={() => { signOut() }}>ออกจากระบบ</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link href="/signin">
                                        <button className="bg-blue-500 hover:bg-blue-600 py-2 px-3 rounded-md">เข้าสู่ระบบ</button>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/signup">
                                        <button className="bg-blue-500 hover:bg-blue-600 py-2 px-3 rounded-md">สมัครสมาชิก</button>
                                    </Link>
                                </li>
                            </>
                        )}

                    </ul>
                </div>

            </div>
        </nav>
    )
}