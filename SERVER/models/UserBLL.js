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
   
  const newuser= await User.findOne({email:user.email,password:password})
  if (newuser)
   return newuser
  else
   return null
}
const newPassword = async (user) => {
   
    const newuser= await User.findOne({email:user.email})
    if (newuser)
    User.Update({email:user.email,password:user.password},{
        $set: {
          amount: amount+1
        },
        $currentDate: { lastUpdated: true }
      })
   
    else
     return null
  }
  

const deleteUser = async (id) => {
   
    await User.findByIdAndDelete(id)
    console.log("delete")
    return "success"
}


module.exports = { checkUserExists, createUser, deleteUser ,newPassword}