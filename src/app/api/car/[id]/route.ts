import { Car } from "@/app/page";
import { readFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params } : { params: { id: string }}) {
    const rawJson = await readFile('src/cars.json', 'utf-8');
    const cars = JSON.parse(rawJson) as Car[];

    return NextResponse.json(cars.find(car => car.id === parseInt(params.id)));
}