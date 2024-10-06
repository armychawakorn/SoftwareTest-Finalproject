import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex justify-center mt-16">
        <div className="container p-8 bg-[#2B2D31] shadow-xl text-white rounded-xl">
          <div className="flex justify-center">
            <div className="grid grid-row w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 gap-2">
              <span className="text-2xl text-center">นี่คือเว็บไซต์สำหรับทดสอบ</span>
              <span className="text-2xl text-center">ในรายวิชา Software Test</span>
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
                <Link href={'/signin'} className="bg-[#5D66F6] p-2 rounded-md w-full mt-4 hover:bg-[#4B53C7] duration-200 text-center">เข้าสู่ระบบ</Link>
                <Link href={'/signup'} className="bg-[#5D66F6] p-2 rounded-md w-full mt-4 hover:bg-[#4B53C7] duration-200 text-center">สมัครสมาชิก</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
