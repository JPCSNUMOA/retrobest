import { NextResponse } from "next/server";
import connectMongo from "../../../utils/mongoDB";
import Vote from "../../../models/Vote";

export async function GET() {
    try {
        await connectMongo();

        // Fetch all data from the Votes collection
        const votes = await Vote.find({});

        return NextResponse.json(votes);
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch data", error: error.message },
            { status: 500 }
        );
    }
}
