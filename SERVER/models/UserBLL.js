const User = require("./UserModel")

const createUser = async (   {cell_no:cell_no,
  email:email,
  password:password,
  first_name:first_name,
  last_name:last_name,  
  city:city,
  street:street,
  house_no:house_no,
  enter_no:enter_no,
  building:building,
  zip_id:zip_id,
  pob:pob}  ) => {
    try
    { 
      var user=User.find().sort("user_id").limit(1)
      var user_id
    if(user.data==null)
       user_id=1
    else
       user_id=user.data+1
  
        const newUser = new User( {cell_no:cell_no,
          email:email,
          password:password,
          first_name:first_name,
          last_name:last_name,  
          city:city,
          street:street,
          house_no:house_no,
          enter_no:enter_no,
          building:building,
          zip_id:zip_id,
          pob:pob,
          user_id:user_id,
          role:0
        } )
        console.log(newUser)
         await newUser.save()  
         console.log("Created")
        return newUser
    }
    catch(e)
    {   console.log("fail to create"+e)
        return null
    }
}


const checkUserExists = async (user) => {
   
  const newuser= await User.findOne({email:user.email,password:user.password})
  if (newuser)
   return newuser
  else
   return null
}
const checkUserEmailExist = async (email) => {
   console.log("email")
  const newuser= await User.findOne({email:email})
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


module.exports = { checkUserExists, createUser, deleteUser ,newPassword,checkUserEmailExist}