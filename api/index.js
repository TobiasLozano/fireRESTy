import express from 'express';
const app = express();
const port = 3000;

// I'll use JSON to process data
app.use(express.json())

app.get('/', (req,res)=>{
    console.log(req)
    res.send('Hello World!')
}
) 

app.listen(port,
    ()=>{
        console.log(`Server running on port http://localhost:${port}`)
    }
)