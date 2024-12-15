// app/api/vote/route.js
import { NextResponse } from "next/server";
import connectMongo from "../../../utils/mongoDB";
import Vote from "../../../models/Vote";

export async function POST(req) {
    try {
        await connectMongo();

        const { voteId, candidateName } = await req.json();

        if (!voteId || !candidateName) {
            return NextResponse.json(
                { message: "Vote ID and candidate name are required" },
                { status: 400 }
            );
        }

        try {
            const vote = await Vote.create({ voteId, candidateName });
            return NextResponse.json(
                { message: "Vote submitted successfully", vote },
                { status: 201 }
            );
        } catch (error) {
            if (error.code === 11000) {
                return NextResponse.json(
                    { message: "Vote ID already used"},
                    { status: 409 }
                );
            }

            return NextResponse.json(
                { message: "Internal Server Error", error: error.message },
                { status: 500 }
            );
        }
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to process request", error: error.message },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json(
        { message: "This endpoint only supports POST requests" },
        { status: 405 }
    );
}
