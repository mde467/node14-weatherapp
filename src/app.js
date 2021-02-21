
const path = require("path") ;
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');
const app = express()

const partialPath = path.join(__dirname , "../templates/partial");
const viewsPath = path.join(__dirname , "../templates/views");
const publicPath = path.join(__dirname , "../public");
app.set('view engine', 'hbs');
app.set("views", viewsPath);
hbs.registerPartials(partialPath);
app.use(express.static(publicPath));

app.get('', (req,resp)=>{
    resp.render("index", {
        title: 'Weather app',
        name: 'Mrudula'
    });
})
app.get('/about', (req,resp)=>{
    resp.render("about", {
        title: 'About Me',
        name: 'Mrudula'
    });
})
app.get('/help', (req,resp)=>{
    resp.render("help", {
        title: 'Help',
        message: 'Help page',
        name: 'Mrudula'
    });
})


app.get('/weather', (req, resp)=>{
    if(req.query.address==null || req.query.address=="")
    {
        resp.send({
            error: "You must provide an address"
        })
    }else{
    geocode(req.query.address, (error, {latitude, longitude,location}={})=>{
        if(error){
            return resp.send({error});
        }
        forecast(latitude, longitude, (error,forecastData)=>{
            if(error){
                resp.send(error);
            }
            resp.send(
                {
                    forecast:forecastData, location,
                    address:req.query.address
                }
            )
        })
    
    
})
    }
})
app.get('/help/*', (req,resp)=>{
    resp.render('error',{
        title:'404',
        message:"Help article not found.",
        name:'Mrudula'
    });
})

app.get('*',(req,resp)=>{
    resp.render('error',{
        title:'404',
        message:"404 page not found",
        name:'Mrudula'
    });
})
app.listen(3000, ()=>{
    console.log('Server is up on port 3000');
});