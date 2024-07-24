import { NextResponse } from "next/server";
import { connectToDb } from "@/utils/database";
import post from "@/models/post";

export const GET = async (request, {params} ) => {

    const { id } = params
  try {
    console.log("mongodb not connected");
    await connectToDb();

    const postss = await post.findById(id);
    return new NextResponse(JSON.stringify(postss), { status: 200 });
    
  } catch (error) {
    return new NextResponse("failed to fetch posts", { status: 500 });
  }
};
