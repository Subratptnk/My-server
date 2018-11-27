 const express = require('express');
 const hbs = require('hbs');
 const fs = require('fs');
 const port = process.env.PORT || 3000;

 var app = express();
 hbs.registerPartials(__dirname + '/views/partials')    //registering the partials and locating it statically
 /*
 ********************************* Middleware *************************************************************
  Middleware functions are functions that have access to the request object (req), the response object (res), and the next function in the application’s request-response cycle.
  The next function is a function in the Express router which, when invoked, executes the middleware succeeding the current middleware.

  in order to strat middleware we use app.use
  ************************************************************************************************************
 */

 /*
 ********************* how to link it static way **********************************************
 For now we're going to pass an express.static and we're going to call it as a function now express
 that static takes the absolute path to the folder you want to serve up if we want to be able to serve
 up forward slash help. We're going to need to provide the path to the public folder.
 This means we need to specify the path from the root of our hard drive which can be tricky because your
 projects move around.Luckily we have that __dirname and variable.
 This is the variable that gets passed into our file by that wrapper function we explored the name it
 stores the path to your projects directory.
 In this case it stores the path to My.
 All we have to do is concatenate forward slash public to tell it to use this directory for our server.
 concatenate using the plus sign the string forwards slash public
 ***************************************************************************************************
 */
 app.use((req,res,next) => {
   var now = new Date().toString();
   var log = `${now}: ${req.method} ${req.url}`;
   console.log(log);
   fs.appendFileSync('server.log',log + '\n');
   next();
 });



 app.set('view engine','hbs');
 app.use(express.static(__dirname + '/public'));

                        // here we have to create a app so we will call a methods using express
    // here we didn't added any fuction we will config it while doing more thing in this server

/*
********************* We can start setting up all of our HTP route handlers. ***************************************
        For example if someone visits the root of the Web site we're going to want to send something back maybe
        at some Jason data,maybe it's an htmlpage.We can register a handler using app.get method.

        You define *routing using methods* of the Express app object that correspond to HTTP methods;
        for example, app.get() to handle GET requests and app.post to handle POST requests.

        first element is the url
        In our case we are going for the root of the app so we can just use (/)
        And the second argument and this is going to be the function
        to run the function that tells express that to send back to the person who made the request.

        for more detail information communicate the given link : https://expressjs.com/en/guide/routing.html
**********************************************************************************************************************
*/

  hbs.registerHelper('year', () => {
    return new Date().getFullYear()
  });


  app.get('/',(req,res) => {
/* req= request, res=response; here is the space where we will share what we want to do and show up.
    So when someone views the Web site they're going to see this string if they make a request from an application
    res.render( ) =>	Render a view template.
*/
    res.render('home.hbs',{
      pageTitle: 'Home page',
      WelcomeMsg: 'Welcome to my new website',

    });
  });

    app.get('/about',(req,res) => {
      res.render('about.hbs',{
        pageTitle: 'About page',
        WelcomeMsg: 'This is my about page',
        year: new Date().getFullYear()
      });
    });





    //app.listen => is going to bind the application to a port on our machine.
    app.listen(port, () => {
      console.log(`Server is up on port ${port}`);
    });
