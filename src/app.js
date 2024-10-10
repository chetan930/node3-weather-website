const path=require('path')
const express=require('express');
const hbs=require('hbs')
const forecast=require('./utils/forecast')
const geocode=require('./utils/geocode')
const port=process.env.PORT || 3000;

// console.log(path.join(__dirname,'../public'))

const app=express();

// define path for express config 
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')


// setup static directory to serve
app.use(express.static(publicDirectoryPath))

// setup handlerbars view and locations 
app.set('view engine', 'hbs');
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Chetan Poharkar'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'This isAbout Page',
        name:'Chetan Poharkar'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        helpText:'This is helpfull text from help page',
        name:'Chetan Poharkar'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send('Please provide the address')
    }

    geocode(req.query.address,(error,data)=>{
        if(error){
            return res.send({error:error})
        }
    
        forecast(data.latitude,data.longitude,(error,forecastData)=>{
            if(error){
             return res.send({error:error})
            }
    
            console.log()
            console.log()
            res.send({
                address:req.query.address,
                location:data.location,
                time:forecastData.time,
                forecast:forecastData.forecast,
                current:forecastData.current,
            })
         })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'Help 404 Page',
        text:'Help article not found',
        name:'Chetan Poharkar'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'My 404 page',
        text:'Page not found',
        name:'Chetan Poharkar'
    })
})

app.listen(port,()=>{
    console.log("App is running on port "+port)
})