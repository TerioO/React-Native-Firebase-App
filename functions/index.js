// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore
const admin = require('firebase-admin');
admin.initializeApp();

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  [ Query call: req.query ]
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// functions.https --> create a function that handles HTTP requets
//    - Can be called through the unique link generated like so:
//            http://$HOST:$PORT/$PROJECT/$REGION/$NAME
// events: https.onRequest(req, resp), https.onCall
exports.addMessage = functions.https.onRequest(async (req, res) => {
  const original = req.query;     
  const writeResult = await admin.firestore().collection('messages').add({original: original});
  res.json({result: `Message with ID: ${writeResult.id} added, with contents: ${original}`});
});

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Write a user to the firestore database with a HTTP request (URL?name="ex1"&email="ex2")
// When calling the function the req.query expects some input after the URL
//    - The input is written after ( ? ) followed by key: value pairs separated by a ( & ) 
//    - Example: http://localhost:5001/awesomeproject-99390/us-central1/addMessage1?name=Mat&age=21
//    - req.query will store an object and select each property with req.query.propertyName
exports.writeUser = functions.https.onRequest(async (req, res) => {
  let name = req.query.name;      
  let email = req.query.email;
  if(!name == true || !email == true){  // --> Check if the user gave the expected input, if not send an error message
    res.json({error: "Check that you inserted name and email properly!"});
  }
  else{
  const writeResult = await admin.firestore().collection('users').add({name: name, email: email, status: "online"})
  // res.json({result: `Added document with ID: ${writeResult.id} --> with fields:`,
  //           name: name, 
  //           email: email})
  res.write(`Collection 'users' updated! \n\tAdded document with ID: ${writeResult.id} -->  fields:\n\t\tname: ${name} \n\t\temail: ${email}`);
  res.end();  // --> Works like a return ?? 
  }
  // res.json({}) OR res.send({}) will terminate the request, meaning you can call this method once
  //    - If you need to send multiple messages, use res.write('string') --> REMEMBER to terminate the request with the res.end() command.
  //    - Since res.end() works like a return, place it accordingly
})

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Read a user from the firestore database with a HTTP request (select which user by asking in the URL ?email="example@...")
// Use the documentation from here:
//    - Firebase admin module: admin.  --> https://firebase.google.com/docs/reference/admin/node/firebase-admin  
//    - Firebase admin/ Firestore module: admin.firestore()  --> https://firebase.google.com/docs/reference/admin/node/firebase-admin.firestore
//    - admin.firestore() reference:   --> https://googleapis.dev/nodejs/firestore/latest/CollectionReference.html#where
exports.readUser = functions.https.onRequest(async (req, res) => {  
  if(!req.query.email == true){   //     -->  If an invalid query is entered, return an error and prevent the program from crashing (reads undefined)
    res.json({error: "Search using an email address!"});
  }
  else{
    let email = req.query.email;  //     --> Search the user by his email
    let status = req.query.status;
    if(!status == true){          //     --> If this field is omitted, default it to 'offline'
      status = 'offline';
    }
    let collectionRef = admin.firestore().collection('users');
    collectionRef.where('email','==',email).get().then(querySnapshot => {
      if(querySnapshot.empty){    //     --> Check if the doc exists, without this check the program would be stuck in an infinite loop 
        res.json({error: `The entry doesnt exist`});
      }
      else{                       //     --> If there are duplicate documents (email fields) display them 
        querySnapshot.forEach(documentSnapshot => {
            admin.firestore().collection('users').doc(documentSnapshot.id).update({status: status});
            res.write('Found document at --> ID: ' + documentSnapshot.id + '\n\tfields:\n\t\tname: ' + documentSnapshot.data().name+'\n\t\temail: ' + documentSnapshot.data().email + '\n\t\tstatus: ' + status);
        });
        res.end();
      }
    });
  }
})

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  [ Body call: req.body ]
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Use POST request:
//    - Go to body --> raw --> select JSON from dropdown
//    - req.body will grab w/e was given in that body (JSON, Text, HTMl, ...)
exports.bodyWriteUser = functions.https.onRequest(async (req, res) => {
// Grab name and email from given JSON
  if(req.body.hasOwnProperty('name') && req.body.hasOwnProperty('email')){    // --> .hasOwnProperty checks if an object has that property(not inherited) and returns TRUE if so
    let name = req.body.name;                                                         
    let email = req.body.email;
    if(typeof name != typeof 'a' || typeof email != typeof 'a'){
      res.status(400);
      res.json({error: "Fields must be strings!"});
    }
    const writeResult = await admin.firestore().collection('users').add({name: name, email: email, status: "online"});
    res.status(201);                         // --> Update status accordingly (201 - Created (request succeded))
    res.write(`Collection 'users' updated! \n\tAdded document with ID: ${writeResult.id} -->  fields: \n\t\tname: ${name} \n\t\temail: ${email}`)
    res.end();
  }
  else{      
    res.status(400);                        // --> Update status accordingly (400 - Bad request)
    res.json({error: "Didn't give JSON input with name and email!"})
  }  
})

exports.bodyReadUser = functions.https.onRequest(async (req, res) => {
  let email = req.body.email;
  if(!email == true){ 
    res.status(400);  
    res.json({error: "Search using an email address!"});
  }
  else{
    let collectionRef = admin.firestore().collection('users');
    collectionRef.where('email','==',email).get().then(querySnapshot => {
      if(querySnapshot.empty){    //     --> Check if the doc exists, without this check the program would be stuck in an infinite loop 
        res.status(400);
        res.json({error: `The entry doesnt exist`});
      }
      else{                       //     --> If there are duplicate documents (email fields) display them 
        querySnapshot.forEach(documentSnapshot => {
            res.write(`Found document at --> ID: ${documentSnapshot.id} \n\tfields: \n\t\tname: ${documentSnapshot.data().name} \n\t\temail: ${documentSnapshot.data().email}\n\n`);
        });
        res.status(200);          //     -->  The resource describing the result of the action is transmitted in the message body 
        res.end();
      }
    });
  }
})
