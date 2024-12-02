const express = require('express')
const bodyParser = require('body-parser')
const mysql = require("mysql");
const server = express();
server.use(bodyParser.json());
const cors = require('cors');

server.use(cors({
  origin: 'http://localhost:4200',
}));

const db = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "",
    database: "dbsmschool",

});

db.connect(function (error) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      console.log("successfully Connected to DB");
    }
  });

  server.listen(8085,function check(error) {
    if (error) 
    {
    console.log("Error....dddd!!!!");
    }

    else 
    {
        console.log("Started....!!!! 8085");

    }
});

server.post("/api/package/add", (req, res) => {
  let details = {
    package_name: req.body.package_name,
    package_price: req.body.package_price,
    package_go: req.body.package_go,
    package_desti: req.body.package_desti,
    package_arr: req.body.package_arr,
    package_back: req.body.package_back,
    package_desc: req.body.package_desc,
    package_left: req.body.package_left
  };

  let sql = "INSERT INTO package SET ?";
  db.query(sql, details, (error) => {
    if (error) {
      res.send({ status: false, message: "Package creation failed" });
    } else {
      res.send({ status: true, message: "Package created successfully" });
    }
  });
});



server.post("/api/student/add", (req, res) => {
  const { stname, course, fee, pwd } = req.body;
  const checkQuery = "SELECT * FROM student WHERE stname = ?";
  db.query(checkQuery, [stname], (error, results) => {
    if (error) {
      return res.status(500).send({ status: false, message: "Database error" });
    }
    if (results.length > 0) {
      return res.status(400).send({ status: false, message: "User name already exists" });
    }
    const details = {
      stname: stname,
      course: course,
      fee: fee,
      pwd: pwd,
    };
    const sql = "INSERT INTO student SET ?";
    db.query(sql, details, (error) => {
      if (error) {
        return res.status(500).send({ status: false, message: "User creation failed" });
      } else {
        return res.status(200).send({ status: true, message: "User created successfully" });
      }
    });
  });
});

server.get("/api/package", (req,res)=>{
  var sql = "SELECT * FROM package"
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

server.get("/api/student", (req, res) => {
    var sql = "SELECT * FROM student";
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Error Connecting to DB");
      } else {
        res.send({ status: true, data: result });
      }
    });
  });

server.get("/api/package/:id", (req, res) => {
  var packageid = req.params.id;
  var sql = "SELECT * FROM package WHERE package_id = ?";
  db.query(sql, [packageid], function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});


server.get("/api/student/:id", (req, res) => {
    var studentid = req.params.id;
    var sql = "SELECT * FROM student WHERE id=" + studentid;
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Error Connecting to DB");
      } else {
        res.send({ status: true, data: result });
      }
    });
  });

server.put("/api/package/update/:package_id", (req, res) => {
  const { package_name, package_price, package_go, package_desti, package_arr, package_back, package_desc, package_left } = req.body;
  const package_id = req.params.package_id;

  const sql = "UPDATE package SET package_name = ?, package_price = ?, package_go = ?, package_desti = ?, package_arr = ?, package_back = ?, package_desc = ?, package_left = ? WHERE package_id = ?";

  db.query(sql, [package_name, package_price, package_go, package_desti, package_arr, package_back, package_desc, package_left, package_id], (error, result) => {
    if (error) {
      console.error("Error executing query:", error);
      res.status(500).send({ status: false, message: "Package update failed" });
    } else if (result.affectedRows === 0) {
      res.status(404).send({ status: false, message: "Package not found or no changes made" });
    } else {
      res.send({ status: true, message: "Package updated successfully" });
    }
  });
});

server.put("/api/package/update/package_left/:package_id", (req, res) => {
  const packageId = req.params.package_id;
  const { decrementValue } = req.body; 

  if (decrementValue === undefined || decrementValue <= 0) {
    return res.status(400).send({ status: false, message: "Invalid decrement value" });
  }
  const sql = "UPDATE package SET package_left = package_left - ? WHERE package_id = ?";

  db.query(sql, [decrementValue, packageId], (error, result) => {
    if (error) {
      console.error("Error executing query:", error);
      res.status(500).send({ status: false, message: "Package left update failed" });
    } else if (result.affectedRows === 0) {
      res.status(404).send({ status: false, message: "Package not found or no changes made" });
    } else {
      res.send({ status: true, message: "Package left updated successfully" });
    }
  });
});

server.put("/api/student/update/:id", (req, res) => {
  let sql =
    "UPDATE student SET stname='" +
    req.body.stname +
    "', course='" +
    req.body.course +
    "', fee='" +
    req.body.fee +
    "', pwd='" +
    req.body.pwd +
    "' WHERE id=" +
    req.params.id;

  db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Student Update Failed" });
    } else {
      res.send({ status: true, message: "Student Updated successfully" });
    }
  });
});

  server.delete("/api/package/delete/:package_id", (req, res) => {
    let sql = "DELETE FROM package WHERE package_id=" + req.params.package_id + "";
    let query = db.query(sql, (error) => {
      if (error) {
        res.send({ status: false, message: "Student Deleted Failed" });
      } else {
        res.send({ status: true, message: "Student Deleted successfully" });
      }
    });
  });

  server.delete("/api/student/delete/:id", (req, res) => {
    let sql = "DELETE FROM student WHERE id=" + req.params.id + "";
    let query = db.query(sql, (error) => {
      if (error) {
        res.send({ status: false, message: "Student Deleted Failed" });
      } else {
        res.send({ status: true, message: "Student Deleted successfully" });
      }
    });
  });

  server.post("/api/login", (req, res) => {
    const { username, password } = req.body;
  
    const sql = "SELECT * FROM student WHERE stname = ? AND pwd = ?";
    db.query(sql, [username, password], (error, results) => {
      if (error) {
        res.status(500).send({ status: false, message: "Database error" });
      } else if (results.length === 0) {
        res.status(401).send({ status: false, message: "Invalid username or password" });
      } else {
        res.send({ status: true, message: "Login successful" });
      }
    });
  });
  
  server.post("/api/history/add", (req, res) => {
    const { st_id, p_id } = req.body;

    const sql = "INSERT INTO history (st_id, p_id) VALUES (?, ?)";
    db.query(sql, [st_id, p_id], (error, result) => {
      if (error) {
        console.log("Error inserting into history", error);
        res.send({ status: false, message: "Failed to add history" });
      } else {
        res.send({ status: true, message: "History added successfully" });
      }
    });
  });

  server.get("/api/history", (req, res) => {
    var sql = `
      SELECT 
        history.*, 
        student.stname, 
        student.course, 
        student.fee, 
        package.package_name, 
        package.package_desti, 
        package.package_arr, 
        package.package_price, 
        package.package_go,
        package.package_back,
        package.package_desc
      FROM history
      JOIN student ON history.st_id = student.id
      JOIN package ON history.p_id = package.package_id
    `;
    
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Error connecting to DB", error);
        res.status(500).send({ status: false, message: "Database error" });
      } else {
        res.send({ status: true, data: result });
      }
    });
  });
  
  server.get("/api/history/search", (req, res) => {
    const username = req.query.username;
    var sql = `
      SELECT 
        history.*, 
        student.stname, 
        student.course, 
        student.fee, 
        package.package_name, 
        package.package_desti, 
        package.package_arr, 
        package.package_price, 
        package.package_go,
        package.package_back,
        package.package_desc
      FROM history
      JOIN student ON history.st_id = student.id
      JOIN package ON history.p_id = package.package_id
      WHERE student.stname LIKE ?;`; // Filter by username
    
    db.query(sql, [`%${username}%`], function (error, result) {
      if (error) {
        console.log("Error connecting to DB", error);
        res.status(500).send({ status: false, message: "Database error" });
      } else {
        res.send({ status: true, data: result });
      }
    });
  });
  
