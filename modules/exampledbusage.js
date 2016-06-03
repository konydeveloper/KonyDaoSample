fireExampleDbUsage = function () {

  // Open your database and initialize it if necessary
  databaseMaster.openDatabase();
  if(!kony.store.getItem("DBInit")) {
    databaseMaster.initDatabase();
    kony.store.setItem("DBInit", true);
  }
  
  genericFail = function() {
  	kony.print("Generic Fail");  
  };

  // example calls
  var customerNew = {
    id:"1000",
    firstname:"Hans",
    lastname:"Zimmer",
    gender:1,
    age:59
  };
  
  // Example Insert
  databaseMaster.insertCustomer(customerNew, function() {
  	kony.print("Insert success");
  }, genericFail);
  
  // Example Get
  databaseMaster.getCustomers(function(results) {
    kony.print("Get Success");
    for (var i = 0; i < results.length; ++i) {
      var customer = results[i];
      
      kony.print("id: " + customer.id);
      kony.print("name: " + customer.firstname + " " + customer.lastname);
    }    
  }, genericFail, "id='1000'");
  
};
