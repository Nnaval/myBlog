import user from "@/models/user";
import { connectToDb } from "@/utils/database";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    console.log("about to create a new user");
  const { name, email, password } = await request.json();

  await connectToDb();
  console.log('mongodb connected successfully to create a new user');

  const hashedpassword = await bcrypt.hash(password, 10);

  const newUser = new user({
    name,
    email,
    password: hashedpassword,
  });

  const existingUser = await user.findOne({name:name});

    if (existingUser) { 
        console.log('username already exists');
        return new NextResponse('Username already exists',{status:400})
    };

  // console.log('recieving data', {name, password});
  try {

    await newUser.save();
    return new NextResponse("user created successfuly", { status: 201 });
  } catch (error) {
    return new NextResponse(err.message, { status: 500 });
  }
};
