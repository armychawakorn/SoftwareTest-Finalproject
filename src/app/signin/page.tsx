'use client'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import Swal from 'sweetalert2'

export default function Signin() {
    const [email, setEmail] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)
    async function signinHandler() {
        if (email === null || password === null) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
            })
            return
        }

        Swal.fire({
            title: 'กำลังเข้าสู่ระบบ',
            didOpen: () => {
                Swal.showLoading()
            },
        })

        const res = await signIn('credentials', {
            email: email,
            password: password,
            redirect: false,
        });

        if (res?.ok) {
            Swal.fire({
                icon: 'success',
                title: 'สำเร็จ',
                text: 'เข้าสู่ระบบสำเร็จ',
                allowOutsideClick: false,
            })

            setTimeout(() => {
                window.location.href = '/'
            }, 2000);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'เข้าสู่ระบบไม่สำเร็จ โปรดตรวจสอบอีเมลหรือรหัสผ่านของคุณ',
            })
        }
    }
    return (
        <>
            <div className="flex justify-center mt-16">
                <div className="container p-8 bg-[#2B2D31] shadow-xl text-[#B6BAC1] rounded-xl">
                    <div className="flex justify-center">
                        <div className="grid grid-row w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 gap-2">
                            <span className="text-2xl text-center">เข้าสู่ระบบ</span>
                            <div className="grid grid-rows-2">
                                <label htmlFor="email" className="text-lg">Email</label>
                                <input type="text" id="email" className="bg-[#232428] p-3 rounded-lg w-full focus:outline-none" onChange={(e) => {
                                    setEmail(e.target.value);
                                }} />
                            </div>
                            <div className="grid grid-rows-2">
                                <label htmlFor="password" className="text-lg">Password</label>
                                <input type="password" id="password" className="bg-[#232428] p-3 rounded-lg w-full focus:outline-none" onChange={(e) => {
                                    setPassword(e.target.value);
                                }} />
                            </div>
                            <div className="grid grid-rows-2 gap-3">
                                <button className="bg-[#5D66F6] p-2 rounded-md w-full mt-4 hover:bg-[#4B53C7] duration-200 text-white" onClick={() => {
                                    signinHandler();
                                }}>เข้าสู่ระบบ</button>
                                <span>ต้องการบัญชีผู้ใช้ใหม่? <Link href={'/signup'} className='text-[#3888C8] hover:underline hover:underline-offset-4'>สมัครสมาชิก</Link></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
