var csvParser = require('csv-parse');
var mysql = require('mysql');
var fs = require('fs');


var filePath = './sampleProductFeed2.csv';
fs.readFile(filePath, {
    encoding: 'utf-8'
  }, function(err, csvData) {
    if (err) {
      console.log(err);
    }
  
    csvParser(csvData, {
      delimiter: ','
    }, function(err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);



        
        //sql stuff
        var con = mysql.createConnection({
            host: "localhost",
            user: "",
            passowrd: "",
            database: "test"
          });
        
          con.connect(function(err){
              if(err) throw err;
              console.log("connected")
             //drop and create variable queries
             var drop = "DROP TABLE IF EXISTS products"
             var create = "CREATE TABLE products (Sku VARCHAR(255), ShortDescription VARCHAR(255), LongDescription VARCHAR(255), Color VARCHAR(255), Size VARCHAR(255))"
            //drop table query
             con.query(drop, function(err, result) {
                 if(err) throw err;
                 console.log("table dropped if existed")
             })
             //create table query
             con.query(create, function(err, result) {
                 if(err) throw err;
                 console.log("table 'products' created")
             })
              //insert data into table
              var sql = "INSERT INTO products (Sku, ShortDescription, LongDescription, Color, Size) VALUES ?"

              //code which excludes header upon import
             var data2 = [];
              for(var i = 1; i < data.length; i++) {
                    data2.push(data[i]);
              } // data2 is new array which contains all rows except for the header row
              
              con.query(sql, [data2], function (err, result){
                  if(err) throw err;
                  console.log("inserted");
              })
          }); //end sql stuff
      }
    });
  });

 