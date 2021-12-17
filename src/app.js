const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('../src/util/util')
const forecast = require('../src/util/forecast')

const app = express();



const publicPathDir = path.join(__dirname,"../public")
const viewPath = path.join(__dirname,"../template/views")
const partialPath = path.join(__dirname,"../template/partial")

app.set('view engine','hbs')
app.set('views',viewPath)
app.use(express.static(publicPathDir))
hbs.registerPartials(partialPath)


// app.use('/', require('../router/router'))

app.get('',(req,res)=>{
    res.render('index',{
        title:"weather app",
        name:"Harry"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About page",
        name:"prince"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Need help ?",
        name:"abdul"
    })
})


// app.get('/help',(req,res)=>{
//     res.send({
//         name:"abdul",
//         age:25
//     })
// })

// app.get('/about',(req,res)=>{
//     res.send("<h1>Abdul Hannan</h1>")
// })

app.get('/weather',(req,res)=>{
  
    const address = req.query.address
    if(!address){
        res.send({
            error:"must provide address in query"
        })
    }else{
        geocode(address,(error,data)=>{
  
            if(error){
             return res.send({
                 error:error
             })
            }
              // console.log('error',error)
              // console.log('data',data)
          
              forecast(data.latitude,data.langitude, (error, forecastData) => {
          
                if(error){
                  return res.send({
                      error:error
                  })
                }
                res.send({
                    location:data.location,
                    forecast:forecastData

                })
                //   console.log(data.location)
                //   console.log(forecastData)
                })
          })

        // console.log(req.query.address)
        // res.send({
        //     forecast:{
        //         location:"mumbai"
        //     }
        // })
    }
})

app.get('/products',(req,res)=>{

    if(!req.query.search){
      return  res.send({
            error:"search query must be enter"
        })
    }
    console.log(req.query.search)
     res.send({
         products:[]
     })
})

app.get('/help/*',(req,res)=>{
    res.send("help article not found")
})


app.get('*',(req,res)=>{
    res.render('error',{
        errorMessage:"page not found",
        name:"wrong"
    })
    
})

app.listen(3000,()=>{
    console.log('server is listening on port 3000')
})