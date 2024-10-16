import mongoose from 'mongoose';

export default async function connectMongoDB() {
	try{
		await mongoose.connect(process.env.MONGO_URI as string);
	} catch(error){
		console.log(error);
	}
}