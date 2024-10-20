import { Car } from "@/app/page";
import { readFile } from "fs/promises";
import { NextResponse } from "next/server";

export async function GET() {
    const rawJson = await readFile('src/cars.json', 'utf-8');
    const cars = JSON.parse(rawJson) as Car[];

    return NextResponse.json(cars);
}