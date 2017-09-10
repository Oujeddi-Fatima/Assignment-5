var express = require('express');
var Rx = require('rxjs');
var fetch = require('node-fetch');

var router = express.Router();

async function getsUsersAsync(){
  let data;
  try{
   data = await fetch('http://jsonplaceholder.typicode.com/users/');
   return data;
  }
  catch(err){
    return err;
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.end('Welcome check the users using the following paths : /promise , /async or /observable :)');
});



router.get('/promise', function(req, res, next) {
  var dataPromise = fetch('http://jsonplaceholder.typicode.com/users/');

  dataPromise.then(data=>data.json())
  .then(users=>res.render('index',{ users:users}))
  .catch(err=>console.log('this is an error'+err));
});

router.get('/observable', function(req, res, next) {

  var dataPromise = fetch('http://jsonplaceholder.typicode.com/users/')
  .then(data => data.json() )
  .then(data => res.render('index', { users:data}))
  .catch(err => console.log(err));

  Rx.Observable.fromPromise(dataPromise)
  .subscribe(
      data => res.render('index',{ users:data}),
      err => console.error('this is an error'+err),
      () => console.log('DONE')//
  );
});

router.get('/async', function(req, res, next) {
  getsUsersAsync()
  .then(data => data.json() )
  .then(data => res.render('index', { users:data}))
  .catch(err => console.log(err));
});


module.exports = router;
