module.exports = {
    getIndex: (req,res)=>{
        res.render('http://localhost:3000/')
        console.log("sending you to index: homepage ")
    },
    getDashboard: (req, res) => {
        res.render('http://localhost:3000/dashboard')
    }
}