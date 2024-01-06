const User = require("./UserModel")
const createUser = async (user) => {
    try
    {
        console.log(user)
        const newUser = new User(user)
        console.log(newUser)
         await newUser.save()  
         console.log("Created")
        return newUser
    }
    catch
    {   console.log("fail to create")
        return null
    }
}


const checkUserExists = async (user) => {
   
  const newuser= await User.findOne({persId:user.persId,phone:user.phone})
  if (newuser)
   return newuser
  else
   return null
}


const deleteUser = async (id) => {
   
    await User.findByIdAndDelete(id)
    console.log("delete")
    return "success"
}


module.exports = { checkUserExists, createUser, deleteUser }