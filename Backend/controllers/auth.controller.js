import User from "../models/user.model.js"
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const expiry= 15 * 24 * 60 * 60 * 1000;

export const register=async (req,res)=>{
    try {
        const {name,username,password,gender}=req.body;

        if(!name || !username || !password || !gender){
            return res.status(400).json({ message: "Fill up all the details!" });
        }

        if(password.length<6){
            return res.status(400).json({ message: "Password must be atleast 6 characters long!" });
        }

        const user=await User.findOne({username});

        if(user){
            return res.status(400).json({ message: "Username is already taken!"});
        }
        
        const hashedPassword=bcryptjs.hashSync(password,10);

        const malePic=`https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femalePic=`https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser= new User({name,username,password: hashedPassword,gender,
            profilePic: gender==="male"?malePic:femalePic
        })

        await newUser.save();

        const {password: pass, ...userData}=newUser.toObject();
        
        const token=jwt.sign({id: newUser._id, username: newUser.username},process.env.JWT_SECRET);

        return res.cookie("token", token, { httpOnly: true, maxAge: expiry }).status(201).json({message: "User Successfully Created!",userData})

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message: "Internal Server Error!"});
    }
}

export const login=async(req,res)=>{
    try {
        const {username,password}=req.body;
        const user=await User.findOne({username});

        if(!username || !password){
            return res.status(400).json({ message: "Fill up all the details!" });
        }

        const checkPassword=bcryptjs.compareSync(password, user?.password || "");

        if(!user || !checkPassword){
            return res.status(400).json({message: "Invalid Credentials!"});
        }
        
        const {password: pass, ...userData}=user.toObject();

        const token=jwt.sign({id: user._id, username: user.username},process.env.JWT_SECRET);

        return res.cookie("token", token, { httpOnly: true, maxAge: expiry }).status(200).json({message: "Login Successful!",userData})

    } catch (error) {
        return res.status(500).json({message: "Internal Server Error!"});
    }

}

export const logout = (req, res) => {
    try {
      res.clearCookie("token");
      return res.status(200).json({message: "Logout Successful!"});
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};