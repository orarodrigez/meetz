const mongoose=require("mongoose")
mongoose.connect('mongodb+srv://orarodrigez:06092023@db.95v5xy8.mongodb.net/meetz')

const db=mongoose.connection();

db.on('eror',console.error.bind(console,'connection error:'));
db.once('open',()=>{
    console.log('mongo connected')
});

export default db