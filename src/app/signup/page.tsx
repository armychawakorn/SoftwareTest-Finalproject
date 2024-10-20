'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import IResponse from '../api/IResponse'

export default function Signup() {
    const [email, setEmail] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)
    const [confirmPassword, setConfirmPassword] = useState<string | null>(null)
    function SignupHandler() {
        if (password !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Password ไม่ตรงกัน',
            })
            return
        } else if (password === null || confirmPassword === null || email === null) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
            })
            return
        }

        Swal.fire({
            title: 'กำลังสมัครสมาชิก',
            didOpen: () => {
                Swal.showLoading()
            },
        })

        fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        }).then(res => res.json()).then((res: IResponse) => {
            if (res.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'สำเร็จ',
                    text: 'สมัครสมาชิกสำเร็จ',
                    allowOutsideClick: false,
                })
                setTimeout(() => {
                    window.location.href = '/signin'
                }, 2000);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.message,
                })
            }
        }).catch((err) => {
            console.log(err)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'เกิดข้อผิดพลาด',
            })
        })
    }
    return (
        <>
            <div className="flex justify-center mt-16">
                <div className="container p-8 bg-[#2B2D31] shadow-xl text-[#B6BAC1] rounded-xl">
                    <div className="flex justify-center">
                        <div className="grid grid-row w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 gap-2">
                            <span className="text-2xl text-center">สมัครสมาชิก</span>
                            <div className="grid grid-rows-2">
                                <label htmlFor="email" className="text-lg m-0 p-0">Email</label>
                                <input type="text" id="email" className="bg-[#232428] p-3 rounded-lg w-full focus:outline-none" onChange={(e) => [
                                    setEmail(e.target.value)
                                ]} />
                            </div>
                            <div className="grid grid-rows-2">
                                <label htmlFor="password" className="text-lg">Password</label>
                                <input type="password" id="password" className="bg-[#232428] p-3 rounded-lg w-full focus:outline-none" onChange={(e) => {
                                    setPassword(e.target.value)
                                }} />
                            </div>
                            <div className='grid grid-rows-2'>
                                <label htmlFor="password" className="text-lg">Confirm Password</label>
                                <input type="password" id="password" className="bg-[#232428] p-3 rounded-lg w-full focus:outline-none" onChange={(e) => {
                                    setConfirmPassword(e.target.value)
                                }} />
                            </div>
                            <div className="grid grid-rows-2 gap-3">
                                <button className="bg-[#5D66F6] p-2 rounded-md w-full mt-4 hover:bg-[#4B53C7] duration-200 text-white" onClick={SignupHandler}>สมัครสมาชิก</button>
                                <Link href={'/signin'} className='text-[#3888C8] hover:underline hover:underline-offset-4'>มีบัญชีอยู่แล้วใช่ไหม?</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
