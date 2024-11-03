import { Car } from "@/app/page";
import { readFile, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import IResponse from "../IResponse";

export async function GET() {
    const rawJson = await readFile('src/cars.json', 'utf-8');
    const cars = JSON.parse(rawJson) as Car[];

    return NextResponse.json(cars);
}

export async function POST(req: Request) {
    const { image, brand, model, year, price } = await req.json() as Car;

    const rawJson = await readFile('src/cars.json', 'utf-8');
    const cars = JSON.parse(rawJson) as Car[];

    const newCar = {
        id: cars.length + 1,
        image,
        brand,
        model,
        year,
        price
    };

    cars.push(newCar);

    await writeFile('src/cars.json', JSON.stringify(cars));

    return NextResponse.json(newCar);
}

export async function PUT(req: Request) {
    const { id, image, brand, model, year, price } = await req.json() as Car;

    const rawJson = await readFile('src/cars.json', 'utf-8');
    const cars = JSON.parse(rawJson) as Car[];

    const index = cars.findIndex(car => car.id === id);
    if (index === -1) {
        const response: IResponse = {
            status: 404,
            message: 'Car not found'
        };
        return NextResponse.json(response, { status: 404 });
    }

    cars[index] = {
        id,
        image,
        brand,
        model,
        year,
        price
    };

    await writeFile('src/cars.json', JSON.stringify(cars));

    return NextResponse.json(cars[index]);
}

export async function DELETE(req: Request) {
    const { id } = await req.json() as { id: number };

    const rawJson = await readFile('src/cars.json', 'utf-8');
    const cars = JSON.parse(rawJson) as Car[];

    const index = cars.findIndex(car => car.id === id);
    if (index === -1) {
        const response: IResponse = {
            status: 404,
            message: 'Car not found'
        };
        return NextResponse.json(response, { status: 404 });
    }

    cars.splice(index, 1);

    await writeFile('src/cars.json', JSON.stringify(cars));

    const response: IResponse = {
        status: 200,
        message: `Car ID: ${id} deleted`
    };

    return NextResponse.json(response);
}