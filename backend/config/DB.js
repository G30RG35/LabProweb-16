import mysql from "mysql"

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Alejandroe2004ms*',
  database : 'escueladb'
});
   
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  
  console.log('connected as id ' + connection.threadId);
});

export default connection