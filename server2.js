var csvParser = require('csv-parse');
var mysql = require('mysql');
var fs = require('fs');


var filePath = './custom_attributes_sample.csv';
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
             var create = "CREATE TABLE products (sku VARCHAR(255), mfcp_brand VARCHAR(255), description VARCHAR(255), short_description VARCHAR(255), clamp_pressure VARCHAR(255), clamp_type VARCHAR(255), gauge_type VARCHAR(255), gauge_series VARCHAR(255), gauge_face_size VARCHAR(255), case_type VARCHAR(255), connection_size VARCHAR(255), gauge_mount VARCHAR(255), gauge_range VARCHAR(255), loctite_brand_application VARCHAR(255), banjo_product_family VARCHAR(255), banjo_product_family_type VARCHAR(255), banjo_product_style VARCHAR(255), banjo_product_size VARCHAR(255))"
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
              var sql = "INSERT INTO products (sku, mfcp_brand, description, short_description, clamp_pressure, clamp_type, gauge_type, gauge_series, gauge_face_size, case_type, connection_size, gauge_mount, gauge_range, loctite_brand_application, banjo_product_family, banjo_product_family_type, banjo_product_style, banjo_product_size) VALUES ?"

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

 