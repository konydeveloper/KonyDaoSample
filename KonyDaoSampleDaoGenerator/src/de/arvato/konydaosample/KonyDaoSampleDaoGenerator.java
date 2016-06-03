package de.arvato.konydaosample;

import static de.arvato.konydao.model.Property.INTEGER;
import static de.arvato.konydao.model.Property.TEXT;
import static de.arvato.konydao.model.Property.REAL;

import java.io.File;

import de.arvato.konydao.model.Entity;
import de.arvato.konydao.model.Schema;

public class KonyDaoSampleDaoGenerator {
	
	public static final int DB_VERSION = 1;
	
	public static void main(String[] args) {
		Schema db = new Schema("konydaosampledb", "Kony Dao Sample Database", DB_VERSION);

		// Create Table Customer
		Entity customer = db.addEntity("Customer");
		
		// Add columns to Customer
		customer.addProperty(TEXT, "id").primaryKey();
		customer.addProperty(TEXT, "firstname");
		customer.addProperty(TEXT, "lastname");
		customer.addProperty(INTEGER, "gender");
		customer.addProperty(INTEGER, "age");
		customer.addProperty(REAL, "satisfaction");

		// Create Table Address
		Entity address = db.addEntity("Address");
		
		// Add columns to Address
		address.addProperty(TEXT, "id").primaryKey();
		address.addProperty(TEXT, "customerid");
		address.addProperty(TEXT, "street");
		address.addProperty(TEXT, "housenumber");
		address.addProperty(TEXT, "zipcode");
		address.addProperty(TEXT, "country");

		// Generate the javascript file from modeled entities
		db.generate(new File("../modules/database.js"));
	}
}
