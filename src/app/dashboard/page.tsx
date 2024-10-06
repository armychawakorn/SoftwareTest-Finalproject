'use client'
import React from 'react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export default function Dashboard() {
    const { data: session, status } = useSession()

    if (status === 'loading') {
        return <div>Loading...</div>
    }
    if (status === 'unauthenticated') {
        return (
            <>
                <div className="flex justify-center mt-16">
                    <div className="container p-8 bg-[#2B2D31] shadow-xl text-white rounded-xl">
                        <div className="flex justify-center">
                            <div className="grid grid-row w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 gap-2">
                                <span className="text-2xl text-center">คุณยังไม่ได้เข้าสู่ระบบ</span>
                                <Link href={'/signin'} className="bg-[#5D66F6] p-2 rounded-md w-full mt-4 hover:bg-[#4B53C7] duration-200 text-center">เข้าสู่ระบบ</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return (
        <>
            <div className="flex justify-center mt-16">
                <div className="container p-8 bg-[#2B2D31] shadow-xl text-white rounded-xl">
                    <div className="flex justify-center">
                        <div className="grid grid-row w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 gap-2">
                            <span className="text-2xl text-center">สวัสดีคุณ {session?.user?.email}</span>
                            <span className="text-2xl text-center">คุณได้เข้าสู่ระบบสำเร็จแล้ว</span>
                            <button className="bg-[#5D66F6] p-2 rounded-md w-full mt-4 hover:bg-[#4B53C7] duration-200 text-center" onClick={() => { signOut() }}>ออกจากระบบ</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
