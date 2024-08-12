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
    console.log("post is -", posts);
    
    return new NextResponse(JSON.stringify(posts), { status: 200 });
    
  } catch (error) {
    return new NextResponse("failed to fetch posts", { status: 500 });
  }
};


export const POST = async (request) => {

  const body = await request.json();

  const newPost = new post(body)
 
  try {
    // console.log("mongodb not connected");
    await connectToDb();
    console.log('mongo connected to send users post');
    

    await newPost.save();
    console.log("user posted saved in our DB successfully");
    

    return new NextResponse("post created successfuly", { status: 201 });
    
  } catch (error) {
    
    return new NextResponse("failed to fetch posts", { status: 500 });
  }
};
