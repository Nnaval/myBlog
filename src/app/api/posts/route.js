import { NextResponse } from "next/server";
import { connectToDb } from "@/utils/database";
import post from "@/models/post";

export const GET = async (request) => {

  const url = new URL(request.url);

  const username = url.searchParams.get("username");

  try {
    // console.log("mongodb not connected");
    await connectToDb();

    const posts = await post.find(username && {username});
    return new NextResponse(JSON.stringify(posts), { status: 200 });
    
  } catch (error) {
    return new NextResponse("failed to fetch posts", { status: 500 });
  }
};
