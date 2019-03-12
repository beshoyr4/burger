// Import MySQL connection
var connection = require("./connection.js");

// Helper function for SQL syntax
// Let's say we want to pass 3 values into the mySQL query
// In order to write the query, we need 3 question marks
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
// Grabs parameter and turns it into a string
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int array
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (The Garbo => 'The Garbo')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {burger_name: 'The Garbo'} => ["burger_name='The Garbo'"]
      // e.g. {devoured: true} => ["devoured=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
  
  // Select all from table
  all: function(tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      // Call back all selected and works backwards to burger.js model
      cb(result);
    });
  },

  // Create new addition to table
  create: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }
      // Call back new addition and works backwards to burger.js model
      cb(result);
    });
  },
  // Update items already in the table
  // An example of objColVals would be {burger_name: blackbean, devoured: true}
  update: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      // Call back with updated item and works backwards to burger.js model
      cb(result);
    });
  },
  delete: function(table, condition, cb) {
    var queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      // Call back without deleted item and works backwards to burger.js model
      cb(result);
    });
  }
};

// Export the orm object for the model (burger.js).
module.exports = orm;