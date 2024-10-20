import Image from "next/image";
import Link from "next/link"

export type Car = {
  id: number;
  image: string;
  brand: string;
  model: string;
  year: number;
  price: number;
}

export default async function Home() {
  const cars = await fetch(`https://${process.env.NEXT_PUBLIC_API_URL}/api/car`, { method: 'GET' }).then(res => res.json()) as Car[];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 py-12">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">ยินดีต้อนรับสู่บริการเช่ารถยนต์ของเรา</h1>
          <p className="text-lg">พบกับรถยนต์หลากหลายรุ่นที่เหมาะกับทุกความต้องการของคุณ</p>
        </div>
      </header>

      <section className="container mx-auto py-12">
        <h2 className="text-2xl font-bold mb-4 text-center">รถยนต์แนะนำ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cars.map((car) => (
            <div key={car.id} className="bg-gray-700 rounded-lg shadow-md overflow-hidden">
              <Image src={car.image} alt="Car" width={400} height={200} />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">รถยนต์ {car.brand} {car.model}</h3>
                <Link href={`/cars/${car.id}`}>
                   <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600">
                     จอง
                   </button>
                 </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

       <section className="container mx-auto py-12">
         <h2 className="text-2xl font-bold mb-4 text-center">ความรู้เกี่ยวกับการเช่ารถ</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="bg-gray-700 p-6 rounded-lg">
             <h3 className="text-xl font-bold mb-2">ประกันภัยรถเช่า</h3>
             <p className="text-gray-400">
               ข้อมูลเกี่ยวกับประกันภัยรถเช่าประเภทต่างๆ และความคุ้มครองที่ได้รับ เพื่อให้คุณเลือกประกันภัยที่เหมาะสมกับการเดินทางของคุณ.
             </p>
           </div>
           <div className="bg-gray-700 p-6 rounded-lg">
             <h3 className="text-xl font-bold mb-2">เงื่อนไขการเช่ารถ</h3>
             <p className="text-gray-400">
               อธิบายเงื่อนไขต่างๆ ในการเช่ารถ เช่น อายุผู้เช่า, เอกสารที่ต้องใช้, การชำระเงิน, และข้อกำหนดอื่นๆ ที่สำคัญ.
             </p>
           </div>
         </div>
       </section>

      <footer className="bg-gray-800 py-4 text-center">
        <p>© 2024 อัสซะลามุอะลัยกุมเช่ารถยนต์. สงวนลิขสิทธิ์</p>
      </footer>
    </div>
  );
}