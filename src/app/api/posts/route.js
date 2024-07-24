import { NextResponse } from "next/server";
import { connectToDb } from "@/utils/database";
import post from "@/models/post";

export const GET = async (request) => {
  try {
    // console.log("mongodb not connected");
    await connectToDb();

    const posts = await post.find();
    return new NextResponse(JSON.stringify(posts), { status: 200 });
    
  } catch (error) {
    return new NextResponse("failed to fetch posts", { status: 500 });
  }
};
