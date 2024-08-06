import  mongoose  from "mongoose";

export default async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        const connection = mongoose.connection; 

        connection.on("connected", () => {
            console.log("Connected to MongoDB");
            
        })

        connection.on("error", (error) => {
            console.error("Failed to connect to MongoDB", error);
            process.exit();
        })

        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
}