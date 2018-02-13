**Welcome**

To run:

1. Download Repo
2. Navigate to inside of folder directory (csvToMySql)
3. Open command prompt
4. run the following command in terminal to download all dependencies:
    npm install
5. Make sure you have mySQL installed with the following existing Database, create it if you haven't already:
    test
6. The following credentials should be true before running this app with your local MySQL database:
    host: "localhost"
    user: ""
    password: ""
    database: "test" 
7. Now we just need to run the server2.js file. This file imports the file name "custom_attributes_sample.csv" file into the mySQL database titled "test" with the following command:
    node server2.js
    
8. Check the database, the "products" table should have been created within it. 
    
