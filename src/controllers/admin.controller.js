const adminDashbord=(req,res)=>{
res.json({
    msg:"welcome to admin dashboard",
    admin: req.user.email
})
}

module.exports={adminDashbord};