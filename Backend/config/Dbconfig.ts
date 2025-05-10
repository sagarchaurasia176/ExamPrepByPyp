import {connect} from 'mongoose';

export const MonogoDbConnection = async (url:string) => {
    try{
        await connect(url,{
            dbName: 'ExampPrep-Pyp',
        });
    }catch(er){
        console.log("Error in connecting to MongoDB", er);

    }

}

