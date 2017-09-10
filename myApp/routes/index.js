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

  }
  return data || '';
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.end('Welcome');
});



router.get('/promise/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  var dataPromise = fetch('http://jsonplaceholder.typicode.com/users/');

  dataPromise.then(data=>data.json())
  .then(users=>res.render('index',{ users:users}))
  .catch(err=>console.log('this is an error'+err));
});

router.get('/observable/', function(req, res, next) {

  var dataPromise = fetch('http://jsonplaceholder.typicode.com/users/');
var datas=[] ;
  Rx.Observable.fromPromise(dataPromise)
  .subscribe(
      data => datas.push(data.json()), 
      err => console.error('this is an error'+err),
      () => console.log(datas)//res.render('index',{ users:datas})
  );
});

router.get('/async', function(req, res, next) {
  const data = getsUsersAsync()
  .then(data => {   return data.json()  })
  .then(data => res.render('index', { users:data}))
  .catch(err => console.log(err));
});
  

module.exports = router;
