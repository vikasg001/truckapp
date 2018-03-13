export class AppSchema {

  public static TABLE_USER = "CREATE TABLE IF NOT EXISTS  user  (" +
    " id  INTEGER PRIMARY KEY AUTOINCREMENT," +
    " username VARCHAR(36)," +
    " password TEXT," +
    " Role INTEGER," +
    " Status INTEGER" +
    ");";

  public static TABLE_TRUCK = "CREATE TABLE IF NOT EXISTS  truck  ( " +
    "  id  INTEGER PRIMARY KEY AUTOINCREMENT, " +
    "  truck_no  INTEGER, " +
    "  insuranceDueDate  TEXT, " +
    "  permitDueDate  TEXT, " +
    "  taxDueDate  TEXT, " +
    "  fitnessDueDate  TEXT, " +
    "  pollutionDueDate  TEXT, " +
    "  createdDate  TEXT, " +
    "  description  TEXT, " +
    "  status  INTEGER " +
    ");";
  public static TABLE_FRIEGHT = "CREATE TABLE IF NOT EXISTS  freight  (" +
    " id INTEGER PRIMARY KEY AUTOINCREMENT," +
    " freightNumber INTEGER," +
    " truckNumber INTEGER," +
    " truckId INTEGER," +
    " createdDate TEXT," +
    " startDate TEXT," +
    " endDate TEXT," +
    " description TEXT," +
    " driverId INTEGER" +
    ");";
  public static TABLE_FRIGHT_DESCRIPTION = "CREATE TABLE IF NOT EXISTS  freight_details  ( " +
    "  id  INTEGER PRIMARY KEY AUTOINCREMENT, " +
    "  frieghtId  INTEGER, " +
    "  itemName  TEXT, " +
    "  price  REAL, " +
    "  type  INTEGER " +
    ");";
  public static TABLE_EXPENSES_DESCRIPTION = "CREATE TABLE IF NOT EXISTS  expenses_details  ( " +
    "  id  INTEGER PRIMARY KEY AUTOINCREMENT, " +
    "  frieghtId  INTEGER, " +
    "  itemName  TEXT, " +
    "  priceUp  REAL, " +
    "  priceDown  REAL, " +
    "  type  INTEGER " +
    ");";
  public static TABLE_PAYMENT_DESCRIPTION = "CREATE TABLE IF NOT EXISTS  payment_details  ( " +
    "  id  INTEGER PRIMARY KEY AUTOINCREMENT, " +
    "  frieghtId  INTEGER, " +
    "  payDescription  TEXT, " +
    "  paymentAmt  REAL, " +
    "  createdDate TEXT," +
    "  type  INTEGER " +
    ");";

  public static TABLE_PAYMENT_DRIVER = "CREATE TABLE IF NOT EXISTS  payment_driver  ( " +
    "  id  INTEGER PRIMARY KEY AUTOINCREMENT, " +
    "  frieghtId  INTEGER, " +
    "  driverId  INTEGER, " +
    "  payDescription  TEXT, " +
    "  paymentAmt  REAL, " +
    "  createdDate TEXT," +
    "  type  INTEGER " +
    ");";
  public static TABLE_DRIVER = "CREATE TABLE IF NOT EXISTS  driver  (" +
    " id INTEGER PRIMARY KEY AUTOINCREMENT," +
    " driverName TEXT," +
    " licenceNumber TEXT," +
    " salary REAL," +
    " address TEXT," +
    " mobile TEXT," +
    " status INTEGER, " +
    " dateofjoin TEXT" +
    ");";
}
