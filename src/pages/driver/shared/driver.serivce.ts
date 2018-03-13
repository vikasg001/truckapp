import {Injectable} from "@angular/core";
import {AppSQLite} from "../../../app/shared/app.sqlite";
import {AppStorage} from "../../../app/shared/app.storage";
import {AppConstant} from "../../../app/shared/app.constant";
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";

@Injectable()

export class DriverService {
  headers: any = {};

  constructor(private storage: AppSQLite, private http: Http) {
    this.makeHeadersRequest();
  }

  addDriver(object: any) {
    let keys = Object.keys(object);
    if (Object.prototype.toString.call(keys) === '[object Array]') {
      let arrayForQuery = [];
      let dictionaryValues = [];
      // we make array for query
      for (let a = 0; a < keys.length; a++) {
        arrayForQuery.push("?");
        dictionaryValues.push(object[keys[a]]);
      }
      // make sqlite query here
      let sql = 'INSERT OR REPLACE INTO ' + 'driver' + ' (' + keys + ') ' + 'VALUES (' + arrayForQuery + ')';
      console.log(sql, dictionaryValues);
      return this.storage.executeSql(sql, dictionaryValues);
    }
  }

  getDriverList(params?: any) {
    let sql = 'SELECT * FROM driver';
    return this.storage.executeSql(sql, []);
  }


  addTruck(object: any) {
    let keys = Object.keys(object);
    if (Object.prototype.toString.call(keys) === '[object Array]') {
      let arrayForQuery = [];
      let dictionaryValues = [];
      // we make array for query
      for (let a = 0; a < keys.length; a++) {
        arrayForQuery.push("?");
        dictionaryValues.push(object[keys[a]]);
      }
      // make sqlite query here
      let sql = 'INSERT OR REPLACE INTO ' + 'truck' + ' (' + keys + ') ' + 'VALUES (' + arrayForQuery + ')';
      console.log(sql, dictionaryValues);
      return this.storage.executeSql(sql, dictionaryValues);
    }
  }

  getTruckList(params?: any) {
    let sql = 'SELECT * FROM truck';
    return this.storage.executeSql(sql, []);
  }

  logout() {
    AppStorage.removeItem('userLogin');
  }

  addLoginUser() {
    AppStorage.setItem('RegisterUser', true);
    let sql = 'INSERT OR REPLACE INTO user (username,password) VALUES ("amit","amit@123")';
    console.log(sql);
    return this.storage.executeSql(sql, []);
  }

  loginUser(params?: any) {
    let sql = "SELECT * FROM user WHERE username='" + params.username.toString() + "' AND password='" + params.password + "'";
    console.log(sql);
    return this.storage.executeSql(sql, []);
  }

  getDriverSalary(params?: any) {
    let sql = "SELECT *,f.freightNumber FROM payment_driver pd LEFT JOIN freight f ON pd.frieghtId = f.id  WHERE pd.driverId='" + params.id + "' AND pd.paymentAmt > 0 ";
    return this.storage.executeSql(sql, []);
  }

  getMyPayment(params?: any) {
    let sql = "SELECT *,f.freightNumber FROM payment_details pd LEFT JOIN freight f ON pd.frieghtId = f.id";
    return this.storage.executeSql(sql, []);
  }

  /**
   * @description add header content
   */
  makeHeadersRequest() {
    //make headers for service
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('appCurrentVersionNumber', AppConstant.APP_SERVER_VERSION);
    headers.append('WebServiceIdentifier', AppStorage.getItem('webserviceidentifier'));
    this.headers = {headers};
  }
}
