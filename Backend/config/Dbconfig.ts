import { error, log } from 'console';
import {connect} from 'mongoose';
import mongoose from 'mongoose';

export const MonogoDbConnection = async (uri:string) => {
    try{
        await mongoose.connect(uri,{
            dbName: 'ExampPrep-Pyp',
        });
        log("MongoDB connected successfully");
        return true;
    }catch(er){
        console.log("Error in connecting to MongoDB", er);
        throw er;
    }

}

