/**
		WARNING: THIS FILE WAS AUTO GENERATED - DO NOT MODIFY
		
		If you want to add Logic, do so within the "Keep" section at the end of the File! 
 */

if (typeof(databaseMaster) === "undefined") {
	databaseMaster = new DatabaseMaster();
	databaseMaster.self = databaseMaster;
}

function DatabaseMaster() {

	var databaseObjectId;
		
	/**
	Opens Database.
	*/
	this.openDatabase = function() {
		var dbName = "konydaosampledb";
		var version = "1.0";
		var displayName = "Kony Dao Sample Database";
		var estimatedSize = 5 * 1024 * 1024; //5*1024*1024 indicates 5 MB: only for SPA
		var passphrase = null; // Android: Password for encryption, iOS: Pragma statements
		
		kony.print("openDatabase");
		databaseMaster.databaseObjectId = kony.db.openDatabase(dbName, version, displayName, estimatedSize, passphrase);
	}

	/**
	Initializes all Database tables.
	*/
	this.initDatabase = function() {
		kony.print("creating tables");
		
		initDatabaseTransaction = function(dbId) {
			kony.print("initDatabaseTransaction");	
			
			databaseMaster.initDropTableCustomer(dbId);
			databaseMaster.initDropTableAddress(dbId);

			databaseMaster.initCreateTableCustomer(dbId);
			databaseMaster.initCreateTableAddress(dbId);

		}
		
		initDatabaseTransactionSuccess = function() {
			kony.print("initDatabaseSuccess");	
		}
		
		initDatabaseTransactionError = function() {
			kony.print("initDatabaseError");	
		}

		databaseMaster.fireSafeTransaction(databaseMaster.databaseObjectId, initDatabaseTransaction, initDatabaseTransactionError, initDatabaseTransactionSuccess);
	}

	/**
	Drops Customer Database Table.
	*/
	this.initDropTableCustomer = function(dbId) {
		kony.print("initDropTableCustomer");

		initDropTableCustomerError = function(error) {
			kony.print("initDropTableCustomerError");		
			kony.print(" Error code:: " + error);
			kony.print(" Error message:: " + error.message);
		}

		initDropTableCustomerSuccess = function(transactionId, resultset) {
			kony.print("initDropTableCustomerSuccess");		
		}

		var sqlStatement = "DROP TABLE IF EXISTS Customer";
		kony.db.executeSql(dbId, sqlStatement, null, initDropTableCustomerSuccess, initDropTableCustomerError);		
	}

	/**
	Drops Address Database Table.
	*/
	this.initDropTableAddress = function(dbId) {
		kony.print("initDropTableAddress");

		initDropTableAddressError = function(error) {
			kony.print("initDropTableAddressError");		
			kony.print(" Error code:: " + error);
			kony.print(" Error message:: " + error.message);
		}

		initDropTableAddressSuccess = function(transactionId, resultset) {
			kony.print("initDropTableAddressSuccess");		
		}

		var sqlStatement = "DROP TABLE IF EXISTS Address";
		kony.db.executeSql(dbId, sqlStatement, null, initDropTableAddressSuccess, initDropTableAddressError);		
	}

	/**
	Creates Customer Database Table.
	*/
	this.initCreateTableCustomer = function(dbId) {
		kony.print("initCreateTableCustomer");

		initCreateTableCustomerError = function(error) {
			kony.print("initCreateTableCustomerError");
			kony.print(" Error code:: " + error);
			kony.print(" Error message:: " + error.message);
		}
		
		initCreateTableCustomerSuccess = function(trasactionId, resultset) {
			kony.print("initCreateTableCustomerSuccess");
		}

		var sqlStatement = "CREATE TABLE IF NOT EXISTS Customer (id TEXT PRIMARY KEY, firstname TEXT, lastname TEXT, gender INTEGER, age INTEGER, satisfaction REAL)";
		kony.db.executeSql(dbId, sqlStatement, null, initCreateTableCustomerSuccess, initCreateTableCustomerError);
	}

	/**
	Creates Address Database Table.
	*/
	this.initCreateTableAddress = function(dbId) {
		kony.print("initCreateTableAddress");

		initCreateTableAddressError = function(error) {
			kony.print("initCreateTableAddressError");
			kony.print(" Error code:: " + error);
			kony.print(" Error message:: " + error.message);
		}
		
		initCreateTableAddressSuccess = function(trasactionId, resultset) {
			kony.print("initCreateTableAddressSuccess");
		}

		var sqlStatement = "CREATE TABLE IF NOT EXISTS Address (id TEXT PRIMARY KEY, customerid TEXT, street TEXT, housenumber TEXT, zipcode TEXT, country TEXT)";
		kony.db.executeSql(dbId, sqlStatement, null, initCreateTableAddressSuccess, initCreateTableAddressError);
	}

	// ######## CUSTOMER########

	/**
	Clears Customer table by droping and creating table.
	*/
	this.clearCustomers = function(successCallback, failCallback) {
		kony.print("clearing Customer table");
		
		clearCustomerTransaction = function(dbId) {
			kony.print("clearCustomerTransaction");
			
			databaseMaster.initDropTableCustomer(dbId);
			databaseMaster.initCreateTableCustomer(dbId)
		}
		
		clearCustomerTransactionSuccess = function() {
			kony.print("clearCustomerTransactionSuccess");
			if (typeof(successCallback) != "undefined") {
				successCallback();
			}	
		}
		
		clearCustomerTransactionError = function() {
			kony.print("clearCustomerTransactionError");	
			if (typeof(failCallback) != "undefined") {
				failCallback();
			}
		}

		databaseMaster.fireSafeTransaction(databaseMaster.databaseObjectId, clearCustomerTransaction, clearCustomerTransactionError, clearCustomerTransactionSuccess);
	}

	/**
	Counts the amount of rows in the Customer table 
	*/
	this.getCustomerCount = function(where, successCallback, failCallback) {
		kony.print("getting Customer count");
		
		var count = -1;
		
		countCustomerTransaction = function(dbId) {
			kony.print("countCustomerTransaction");
			
			countCustomerSuccess = function(transactionId, resultset) {		
				kony.print("countCustomerSuccess");
				
				var rowItem = kony.db.sqlResultsetRowItem(transactionId, resultset, 0);
				
				count = rowItem["COUNT (*)"];
			}
			
			countCustomerError = function(error) {
				kony.print("countCustomerError");
			}	

			var sqlStatement = "SELECT COUNT (*) FROM Customer WHERE " + where;
			kony.db.executeSql(dbId, sqlStatement, null, countCustomerSuccess, countCustomerError)
		}
		
		countCustomerTransactionSuccess = function() {
			kony.print("countCustomerTransactionSuccess");
			if (typeof(successCallback) != "undefined") {
				successCallback(count);
			}	
		}
		
		countCustomerTransactionError = function() {
			kony.print("countCustomerTransactionError");	
			if (typeof(failCallback) != "undefined") {
				failCallback(count);
			}
		}

		databaseMaster.fireSafeTransaction(databaseMaster.databaseObjectId, countCustomerTransaction, countCustomerTransactionError, countCustomerTransactionSuccess);
	}

	/**
	Prints all Customers to commandline.
	*/
	this.printCustomers = function() {
		onGetAllCustomersSuccess = function(result) {
			customerToString = function(customer) {
				return "id: " + customer.id + ", firstname: " + customer.firstname + ", lastname: " + customer.lastname + ", gender: " + customer.gender + ", age: " + customer.age + ", satisfaction: " + customer.satisfaction + ", " ;
			}
			for (var i = 0; i < result.length; i++) {
				kony.print(customerToString(result[i]));
			}		
		}

		onGetAllCustomersFail = function() {
			kony.print("onGetAllCustomersFail");
		}

		databaseMaster.getCustomers(onGetAllCustomersSuccess, onGetAllCustomersFail);
	}

	/**
	Inserts Customers into DB.
	*/
	this.insertCustomer = function(entity, successCallback, failCallback) {
		kony.print("insertCustomer");

		insertCustomerTransactionSuccess = function() {
			kony.print("insertCustomerTransactionSuccess");
			if (typeof(successCallback) != "undefined") {
				successCallback();
			}			
		}

		insertCustomerTransactionError = function() {
			kony.print("insertCustomerTransactionError");	
			if (typeof(failCallback) != "undefined") {
				failCallback();
			}
		}

		insertCustomerTransaction = function(dbId) {
			kony.print("insertCustomerTransaction");

			insertCustomerSuccess = function(trasactionId, resultset) {
				kony.print("insertCustomerSuccess");
			}

			insertCustomerError = function(error) {
				kony.print("insertCustomerError");
				kony.print(" Error code:: " + error);
				kony.print(" Error message:: " + error.message);
			}

			var sqlStatement = "INSERT INTO Customer VALUES (\'" + entity.id + "\',\'" + entity.firstname + "\',\'" + entity.lastname + "\'," + entity.gender + "," + entity.age + "," + entity.satisfaction + ")";
			kony.db.executeSql(dbId, sqlStatement, null, insertCustomerSuccess, insertCustomerError)
		}
		
		databaseMaster.fireSafeTransaction(databaseMaster.databaseObjectId, insertCustomerTransaction, insertCustomerTransactionError, insertCustomerTransactionSuccess);
	}


	/**
	Deletes Customers from DB using where condition.
	*/
	this.deleteCustomer = function(where, successCallback, failCallback) {
		kony.print("deleteCustomer");
		
		deleteCustomerTransactionSuccess = function() {
			kony.print("deleteCustomerTransactionSuccess");			
			if (typeof(successCallback) != "undefined") {
				successCallback();
			}	
		}

		deleteCustomerTransactionError = function() {
			kony.print("deleteCustomerTransactionError");		
			if (typeof(failCallback) != "undefined") {
				failCallback();
			}
		}

		deleteCustomerTransaction = function(dbId) {

			deleteCustomerSuccess = function(transactionId, resultset) {		
				kony.print("deleteCustomerSuccess");
			}
			
			deleteCustomerError = function(error) {
				kony.print("deleteCustomerError");
			}	

			var sqlStatement = "DELETE FROM Customer WHERE " + where;
			kony.db.executeSql(dbId, sqlStatement, null, deleteCustomerSuccess, deleteCustomerError)
		}


		databaseMaster.fireSafeTransaction(databaseMaster.databaseObjectId, deleteCustomerTransaction, deleteCustomerTransactionError, deleteCustomerTransactionSuccess);
	}

	/**
	Gets Customers from DB. Optional where statement to filter. e.g. where = "type=10"

	SuccessCallback is called with an array of Customer Objects, if there are results. 
	FailCallback is called, if there are no results or an error occurred.
	*/
	this.getCustomers = function(successCallback, failCallback, where) {
		kony.print("getCustomers");
		var result = [];

		getCustomersTransactionSuccess = function() {
			kony.print("getCustomersTransactionSuccess");			
			if (typeof(successCallback) != "undefined") {
				successCallback(result);
			}	
		}

		getCustomersTransactionError = function() {
			kony.print("getCustomersTransactionError");
			if (typeof(failCallback) != "undefined") {
				failCallback();
			}
		}
			
		getCustomersTransaction = function(dbId) {

			getCustomersSuccess = function(transactionId, resultset) {
		
				kony.print("getCustomersSuccess");
				if (resultset != null && resultset.rows.length > 0) {					

					for (var i = 0; i < resultset.rows.length; i++) {
						var rowItem = kony.db.sqlResultsetRowItem(transactionId, resultset, i);
						var entity = databaseMaster.getCustomerFromRowItem(rowItem);
						databaseMaster.setCustomerRelationships(entity);

						result.push(entity);									
					}

				} else {
					kony.print("Table contains no entries");
				}
			}
			
			getCustomersError = function(error) {
				kony.print("getCustomersError");
				kony.print(" Error code:: " + error);
				kony.print(" Error message:: " + error.message);
			}	

			var sqlStatement = "SELECT * FROM Customer";
			
			if (typeof(where) != "undefined") {
				sqlStatement = sqlStatement + " WHERE " + where;
			}
			
			kony.db.executeSql(dbId, sqlStatement, null, getCustomersSuccess, getCustomersError)
		}

		databaseMaster.fireSafeTransaction(databaseMaster.databaseObjectId, getCustomersTransaction, getCustomersTransactionError, getCustomersTransactionSuccess);
	}
	
	this.getCustomerFromRowItem = function(rowItem) {
		var entity = {
			id:rowItem["id"],
			firstname:rowItem["firstname"],
			lastname:rowItem["lastname"],
			gender:rowItem["gender"],
			age:rowItem["age"],
			satisfaction:rowItem["satisfaction"]
		};

		return entity;
	}

	/**
	Creates Relationships for Customer.
	*/
	this.setCustomerRelations = function(entity) {


	}

	/**
	Gets one Customer from DB using Primary Key.

	SuccessCallback is called with an Customer Object, if there is a results. 
	FailCallback is called, if there are no results or an error occurred.
	*/
	this.getCustomer = function(pk, successCallback, failCallback) {
		kony.print("getCustomer");
		var entity;

		getCustomerTransactionSuccess = function() {
			kony.print("getCustomerTransactionSuccess");
			if (typeof(entity) != "undefined") {
				if (typeof(successCallback) != "undefined") {
					successCallback(entity);
				}				
			} else {		
				if (typeof(failCallback) != "undefined") {
					failCallback();
				}
			}
		}

		getCustomerTransactionError = function() {
			kony.print("getCustomerTransactionError");		
			if (typeof(failCallback) != "undefined") {
				failCallback();
			}
		}

		getCustomerTransaction = function(dbId) {

			getCustomerSuccess = function(transactionId, resultset) {		
				kony.print("getCustomerSuccess");
				if (resultset != null && resultset.rows.length > 0) {
					var rowItem = kony.db.sqlResultsetRowItem(transactionId, resultset, 0);
					entity = databaseMaster.getCustomerFromRowItem(rowItem);
					databaseMaster.setCustomerRelationships(entity);
				} else {
					kony.print("Table contains no entries");
				}
			}
			
			getCustomerError = function(error) {
				kony.print("getCustomerError");
				kony.print(" Error code:: " + error);
				kony.print(" Error message:: " + error.message);
			}	

			var sqlStatement = "SELECT * FROM Customer WHERE id = " + pk;
			kony.db.executeSql(dbId, sqlStatement, null, getCustomerSuccess, getCustomerError)
		}

		databaseMaster.fireSafeTransaction(databaseMaster.databaseObjectId, getCustomerTransaction, getCustomerTransactionError, getCustomerTransactionSuccess);
	}

	/**
	Updates one Customer in DB using Object with Primary Key.
	*/
	this.updateCustomer = function(entity, successCallback, failCallback) {

		updateCustomerTransactionSuccess = function() {
			kony.print("updateCustomerTransactionSuccess");
			if (typeof(successCallback) != "undefined") {
				successCallback();
			}
		}

		updateCustomerTransactionError = function() {
			kony.print("updateCustomerTransactionError");
			if (typeof(failCallback) != "undefined") {
				failCallback();
			}
		}

		updateCustomerTransaction = function(dbId) {

			updateCustomerSuccess = function(transactionId, resultset) {		
				kony.print("updateCustomerSuccess");
			}
			
			updateCustomerError = function(error) {
				kony.print("updateCustomerError");
				kony.print(" Error code:: " + error);
				kony.print(" Error message:: " + error.message);
			}	

			var sqlStatement = "UPDATE Customer SET  firstname = \'" + entity.firstname + "\', lastname = \'" + entity.lastname + "\', gender = " + entity.gender + ", age = " + entity.age + ", satisfaction = " + entity.satisfaction + " WHERE id = \'" + entity.id + "\'";
			kony.db.executeSql(dbId, sqlStatement, null, updateCustomerSuccess, updateCustomerError);
		}

		databaseMaster.fireSafeTransaction(databaseMaster.databaseObjectId, updateCustomerTransaction, updateCustomerTransactionError, updateCustomerTransactionSuccess);
	}

	// ######## ADDRESS########

	/**
	Clears Address table by droping and creating table.
	*/
	this.clearAddresss = function(successCallback, failCallback) {
		kony.print("clearing Address table");
		
		clearAddressTransaction = function(dbId) {
			kony.print("clearAddressTransaction");
			
			databaseMaster.initDropTableAddress(dbId);
			databaseMaster.initCreateTableAddress(dbId)
		}
		
		clearAddressTransactionSuccess = function() {
			kony.print("clearAddressTransactionSuccess");
			if (typeof(successCallback) != "undefined") {
				successCallback();
			}	
		}
		
		clearAddressTransactionError = function() {
			kony.print("clearAddressTransactionError");	
			if (typeof(failCallback) != "undefined") {
				failCallback();
			}
		}

		databaseMaster.fireSafeTransaction(databaseMaster.databaseObjectId, clearAddressTransaction, clearAddressTransactionError, clearAddressTransactionSuccess);
	}

	/**
	Counts the amount of rows in the Address table 
	*/
	this.getAddressCount = function(where, successCallback, failCallback) {
		kony.print("getting Address count");
		
		var count = -1;
		
		countAddressTransaction = function(dbId) {
			kony.print("countAddressTransaction");
			
			countAddressSuccess = function(transactionId, resultset) {		
				kony.print("countAddressSuccess");
				
				var rowItem = kony.db.sqlResultsetRowItem(transactionId, resultset, 0);
				
				count = rowItem["COUNT (*)"];
			}
			
			countAddressError = function(error) {
				kony.print("countAddressError");
			}	

			var sqlStatement = "SELECT COUNT (*) FROM Address WHERE " + where;
			kony.db.executeSql(dbId, sqlStatement, null, countAddressSuccess, countAddressError)
		}
		
		countAddressTransactionSuccess = function() {
			kony.print("countAddressTransactionSuccess");
			if (typeof(successCallback) != "undefined") {
				successCallback(count);
			}	
		}
		
		countAddressTransactionError = function() {
			kony.print("countAddressTransactionError");	
			if (typeof(failCallback) != "undefined") {
				failCallback(count);
			}
		}

		databaseMaster.fireSafeTransaction(databaseMaster.databaseObjectId, countAddressTransaction, countAddressTransactionError, countAddressTransactionSuccess);
	}

	/**
	Prints all Addresss to commandline.
	*/
	this.printAddresss = function() {
		onGetAllAddresssSuccess = function(result) {
			addressToString = function(address) {
				return "id: " + address.id + ", customerid: " + address.customerid + ", street: " + address.street + ", housenumber: " + address.housenumber + ", zipcode: " + address.zipcode + ", country: " + address.country + ", " ;
			}
			for (var i = 0; i < result.length; i++) {
				kony.print(addressToString(result[i]));
			}		
		}

		onGetAllAddresssFail = function() {
			kony.print("onGetAllAddresssFail");
		}

		databaseMaster.getAddresss(onGetAllAddresssSuccess, onGetAllAddresssFail);
	}

	/**
	Inserts Addresss into DB.
	*/
	this.insertAddress = function(entity, successCallback, failCallback) {
		kony.print("insertAddress");

		insertAddressTransactionSuccess = function() {
			kony.print("insertAddressTransactionSuccess");
			if (typeof(successCallback) != "undefined") {
				successCallback();
			}			
		}

		insertAddressTransactionError = function() {
			kony.print("insertAddressTransactionError");	
			if (typeof(failCallback) != "undefined") {
				failCallback();
			}
		}

		insertAddressTransaction = function(dbId) {
			kony.print("insertAddressTransaction");

			insertAddressSuccess = function(trasactionId, resultset) {
				kony.print("insertAddressSuccess");
			}

			insertAddressError = function(error) {
				kony.print("insertAddressError");
				kony.print(" Error code:: " + error);
				kony.print(" Error message:: " + error.message);
			}

			var sqlStatement = "INSERT INTO Address VALUES (\'" + entity.id + "\',\'" + entity.customerid + "\',\'" + entity.street + "\',\'" + entity.housenumber + "\',\'" + entity.zipcode + "\',\'" + entity.country + "\')";
			kony.db.executeSql(dbId, sqlStatement, null, insertAddressSuccess, insertAddressError)
		}
		
		databaseMaster.fireSafeTransaction(databaseMaster.databaseObjectId, insertAddressTransaction, insertAddressTransactionError, insertAddressTransactionSuccess);
	}


	/**
	Deletes Addresss from DB using where condition.
	*/
	this.deleteAddress = function(where, successCallback, failCallback) {
		kony.print("deleteAddress");
		
		deleteAddressTransactionSuccess = function() {
			kony.print("deleteAddressTransactionSuccess");			
			if (typeof(successCallback) != "undefined") {
				successCallback();
			}	
		}

		deleteAddressTransactionError = function() {
			kony.print("deleteAddressTransactionError");		
			if (typeof(failCallback) != "undefined") {
				failCallback();
			}
		}

		deleteAddressTransaction = function(dbId) {

			deleteAddressSuccess = function(transactionId, resultset) {		
				kony.print("deleteAddressSuccess");
			}
			
			deleteAddressError = function(error) {
				kony.print("deleteAddressError");
			}	

			var sqlStatement = "DELETE FROM Address WHERE " + where;
			kony.db.executeSql(dbId, sqlStatement, null, deleteAddressSuccess, deleteAddressError)
		}


		databaseMaster.fireSafeTransaction(databaseMaster.databaseObjectId, deleteAddressTransaction, deleteAddressTransactionError, deleteAddressTransactionSuccess);
	}

	/**
	Gets Addresss from DB. Optional where statement to filter. e.g. where = "type=10"

	SuccessCallback is called with an array of Address Objects, if there are results. 
	FailCallback is called, if there are no results or an error occurred.
	*/
	this.getAddresss = function(successCallback, failCallback, where) {
		kony.print("getAddresss");
		var result = [];

		getAddresssTransactionSuccess = function() {
			kony.print("getAddresssTransactionSuccess");			
			if (typeof(successCallback) != "undefined") {
				successCallback(result);
			}	
		}

		getAddresssTransactionError = function() {
			kony.print("getAddresssTransactionError");
			if (typeof(failCallback) != "undefined") {
				failCallback();
			}
		}
			
		getAddresssTransaction = function(dbId) {

			getAddresssSuccess = function(transactionId, resultset) {
		
				kony.print("getAddresssSuccess");
				if (resultset != null && resultset.rows.length > 0) {					

					for (var i = 0; i < resultset.rows.length; i++) {
						var rowItem = kony.db.sqlResultsetRowItem(transactionId, resultset, i);
						var entity = databaseMaster.getAddressFromRowItem(rowItem);
						databaseMaster.setAddressRelationships(entity);

						result.push(entity);									
					}

				} else {
					kony.print("Table contains no entries");
				}
			}
			
			getAddresssError = function(error) {
				kony.print("getAddresssError");
				kony.print(" Error code:: " + error);
				kony.print(" Error message:: " + error.message);
			}	

			var sqlStatement = "SELECT * FROM Address";
			
			if (typeof(where) != "undefined") {
				sqlStatement = sqlStatement + " WHERE " + where;
			}
			
			kony.db.executeSql(dbId, sqlStatement, null, getAddresssSuccess, getAddresssError)
		}

		databaseMaster.fireSafeTransaction(databaseMaster.databaseObjectId, getAddresssTransaction, getAddresssTransactionError, getAddresssTransactionSuccess);
	}
	
	this.getAddressFromRowItem = function(rowItem) {
		var entity = {
			id:rowItem["id"],
			customerid:rowItem["customerid"],
			street:rowItem["street"],
			housenumber:rowItem["housenumber"],
			zipcode:rowItem["zipcode"],
			country:rowItem["country"]
		};

		return entity;
	}

	/**
	Creates Relationships for Address.
	*/
	this.setAddressRelations = function(entity) {


	}

	/**
	Gets one Address from DB using Primary Key.

	SuccessCallback is called with an Address Object, if there is a results. 
	FailCallback is called, if there are no results or an error occurred.
	*/
	this.getAddress = function(pk, successCallback, failCallback) {
		kony.print("getAddress");
		var entity;

		getAddressTransactionSuccess = function() {
			kony.print("getAddressTransactionSuccess");
			if (typeof(entity) != "undefined") {
				if (typeof(successCallback) != "undefined") {
					successCallback(entity);
				}				
			} else {		
				if (typeof(failCallback) != "undefined") {
					failCallback();
				}
			}
		}

		getAddressTransactionError = function() {
			kony.print("getAddressTransactionError");		
			if (typeof(failCallback) != "undefined") {
				failCallback();
			}
		}

		getAddressTransaction = function(dbId) {

			getAddressSuccess = function(transactionId, resultset) {		
				kony.print("getAddressSuccess");
				if (resultset != null && resultset.rows.length > 0) {
					var rowItem = kony.db.sqlResultsetRowItem(transactionId, resultset, 0);
					entity = databaseMaster.getAddressFromRowItem(rowItem);
					databaseMaster.setAddressRelationships(entity);
				} else {
					kony.print("Table contains no entries");
				}
			}
			
			getAddressError = function(error) {
				kony.print("getAddressError");
				kony.print(" Error code:: " + error);
				kony.print(" Error message:: " + error.message);
			}	

			var sqlStatement = "SELECT * FROM Address WHERE id = " + pk;
			kony.db.executeSql(dbId, sqlStatement, null, getAddressSuccess, getAddressError)
		}

		databaseMaster.fireSafeTransaction(databaseMaster.databaseObjectId, getAddressTransaction, getAddressTransactionError, getAddressTransactionSuccess);
	}

	/**
	Updates one Address in DB using Object with Primary Key.
	*/
	this.updateAddress = function(entity, successCallback, failCallback) {

		updateAddressTransactionSuccess = function() {
			kony.print("updateAddressTransactionSuccess");
			if (typeof(successCallback) != "undefined") {
				successCallback();
			}
		}

		updateAddressTransactionError = function() {
			kony.print("updateAddressTransactionError");
			if (typeof(failCallback) != "undefined") {
				failCallback();
			}
		}

		updateAddressTransaction = function(dbId) {

			updateAddressSuccess = function(transactionId, resultset) {		
				kony.print("updateAddressSuccess");
			}
			
			updateAddressError = function(error) {
				kony.print("updateAddressError");
				kony.print(" Error code:: " + error);
				kony.print(" Error message:: " + error.message);
			}	

			var sqlStatement = "UPDATE Address SET  customerid = \'" + entity.customerid + "\', street = \'" + entity.street + "\', housenumber = \'" + entity.housenumber + "\', zipcode = \'" + entity.zipcode + "\', country = \'" + entity.country + "\' WHERE id = \'" + entity.id + "\'";
			kony.db.executeSql(dbId, sqlStatement, null, updateAddressSuccess, updateAddressError);
		}

		databaseMaster.fireSafeTransaction(databaseMaster.databaseObjectId, updateAddressTransaction, updateAddressTransactionError, updateAddressTransactionSuccess);
	}



	// Thread Safe Transactions
	var transactions = []; 
	var transactionCounter = 0;
	
	this.fireSafeTransaction = function(dbIdParam, transactionParam, errorCallbackParam, successCallbackParam) {
		transactionCounter = transactionCounter++;
		
		transactionFinishedSuccess = function() {
			successCallbackParam();
			databaseMaster.removeTransactionAndFireNext(transactionCounter);
		}
		
		transactionFinishedError = function() {
			errorCallbackParam()
			databaseMaster.removeTransactionAndFireNext(transactionCounter);
		}
	
		var transaction = {
			counter:transactionCounter,
			dbId:dbIdParam, 
			transaction:transactionParam, 
			errorCallback:transactionFinishedError, 
			successCallback:transactionFinishedSuccess
		};
		
		transactions.push(transaction);
		
		if (transactions.length == 1) {
			databaseMaster.fireCurrentTransaction();
		} else {
			kony.print("WARNING: another transaction running. waiting.");
		}
	}
	
	this.fireCurrentTransaction = function() {
		kony.db.transaction(transactions[0].dbId, transactions[0].transaction, transactions[0].errorCallback, transactions[0].successCallback);
	}
	
	
	this.removeTransactionAndFireNext = function(counterParam) {
		var index = -1;
		for (var i = 0; i < transactions.length; ++i) {
			if (transactions[i].counter == counterParam) {
				index = i;
				break;
			}
		}
		
		if (index > -1) {
			transactions.splice(index, 1);
		}
		
		if (transactions.length > 0) {
			kony.print("WARNING: transaction left in pipe. firing.");
			databaseMaster.fireCurrentTransaction();		
		}
		
	}

	// KEEP START
	
	
	// KEEP END
}