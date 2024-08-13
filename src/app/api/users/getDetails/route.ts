import connect from "@/dbCongfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
    try {
        //Check user exists
        const user = await User.findOne({ email });
        if(!user) return NextResponse.json({ error: "User doesn't exists" }, { status: 400 });

        //Check password
        const validPassword = await bcryptjs.compare(password, user.password); // true or false;

        if(!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        }

        //Create cookie token for user
        //Token data 

        const tokenData = {
            _id: user._id,
            username: user.username,
            email: user.email
        }

        //Create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!);

        const response = NextResponse.json({ 
            message: "User logged in successfully",
             success: true },
         { status: 200 }
        );

        response.cookies.set("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 30 * 60 * 60 * 24 * 1000),
        });
        return response;
        
    } catch (error : any) { 
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}



connect()