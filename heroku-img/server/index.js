const PORT = process.env.PORT || 3000;
const express = require("express");
const { spawn } = require('child_process');
require('dotenv').config();
const app = express();
var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-1' });
s3 = new AWS.S3({ apiVersion: '2006-03-01' });

const { PythonShell } = require('python-shell');


// I HAVE DEFATED CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://treehacks.vercel.app"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json());

// const players = require('../data.json')


// ------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------------


app.get('/', (req, res) => {
    let options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: 'python/', //If you are having python_test.py script in same folder, then it's optional.
        args: ['shubhamk314', 'dogwater'] //An argument which can be accessed in the script using sys.argv[1]
    };

    PythonShell.run('saveas.py', options, function (err, result) {
        if (err) throw err;
        // result is an array consisting of messages collected
        //during execution of script.
        console.log('result: ', result.toString());
        res.send(result.toString())
    });
})

app.get('/python', (req, res) => {
})

app.get('/aws', (req, res) => {
    // Call S3 to list the buckets
    s3.listBuckets(function (err, data) {
        if (err) {
            console.log("Error", err);
            res.send(err)
        } else {
            console.log("Success", data.Buckets);
            console.log(`First bucket: ${data.Buckets[1].Name} created at: ${data.Buckets[1].CreationDate}`);
            bucketName = data.Buckets[1].Name
            res.send(`First bucket: ${bucketName}`)
        }
    });
})



app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
})




// const express = require('express');
// const app = express();

// //Import PythonShell module.
// const { PythonShell } = require('python-shell');

// //Router to handle the incoming request.
// app.get("/", (req, res, next) => {
//     //Here are the option object in which arguments can be passed for the python_test.js.
//     let options = {
//         mode: 'text',
//         pythonOptions: ['-u'], // get print results in real-time
//         scriptPath: 'python/', //If you are having python_test.py script in same folder, then it's optional.
//         args: ['shubhamk314', 'dogwater'] //An argument which can be accessed in the script using sys.argv[1]
//     };


//     PythonShell.run('saveas.py', options, function (err, result) {
//         if (err) throw err;
//         // result is an array consisting of messages collected
//         //during execution of script.
//         console.log('result: ', result.toString());
//         res.send(result.toString())
//     });
// });

// //Creates the server on default port 8000 and can be accessed through localhost:8000
// const port = 8000;
// app.listen(port, () => console.log(`Server connected to ${port}`));