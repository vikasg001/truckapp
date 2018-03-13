import {Injectable} from "@angular/core";
import {AppSQLite} from "../../../app/shared/app.sqlite";
import {AppStorage} from "../../../app/shared/app.storage";
import {AppConstant} from "../../../app/shared/app.constant";
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";

@Injectable()

export class HomeService {
  headers: any = {};

  constructor(private storage: AppSQLite, private http: Http) {
    this.makeHeadersRequest();
  }

  logout() {
    AppStorage.removeItem('userLogin');
  }

  getDriverList(params?: any) {
    let sql = 'SELECT * FROM driver';
    return this.storage.executeSql(sql, []);
  }

  getTruckList(params?: any) {
    let sql = 'SELECT * FROM truck';
    return this.storage.executeSql(sql, []);
  }

  getUser(params?: any) {
    let sql = "SELECT * FROM user ";
    console.log(sql);
    return this.storage.executeSql(sql, []);
  }

  getDriverSalary(params?: any) {
    let sql = "SELECT * FROM payment_driver";
    return this.storage.executeSql(sql, []);
  }


  postSynData(params?: any) {
    this.makeHeadersRequest();
    return this.http.post(AppConstant.API_URL, JSON.stringify(params), this.headers).map(res => res.json());
  }


  getAllDataSyn() {
    let dataList = [];
    const promiseArrayOne = [], promiseArrayTwo = [], promiseArrayThree = [], promiseArrayFour = [],
      promiseArrayFive = [], promiseArraySix = [], promiseArraySeven = [], promiseArrayEight = [];
    return new Promise((resolve, reject) => {
      promiseArrayOne.push(this.getUser());
      promiseArrayTwo.push(this.getDriverList());
      promiseArrayThree.push(this.getTruckList());
      promiseArrayFour.push(this.getPayment());
      promiseArrayFive.push(this.getExpensesDetails());
      promiseArraySix.push(this.getFreightDetails());
      promiseArraySeven.push(this.getDriverSalary());
      promiseArrayEight.push(this.getFreightList());
      Promise.all(promiseArrayOne).then((dataAmt) => {
        for (let index = 0; index < dataAmt.length; index++) {
          dataList['getUserData'] = dataAmt[index];
        }
        Promise.all(promiseArrayTwo).then((dataAmtTwo) => {
          for (let index = 0; index < dataAmtTwo.length; index++) {
            dataList['getDriverList'] = dataAmtTwo[index];
          }
          Promise.all(promiseArrayThree).then((dataAmtThree) => {
            for (let index = 0; index < dataAmtThree.length; index++) {
              dataList['getTruckList'] = dataAmtThree[index];
            }
            Promise.all(promiseArrayFour).then((dataAmtFour) => {
              for (let index = 0; index < dataAmtFour.length; index++) {
                dataList['getPayment'] = dataAmtFour[index];
              }
              Promise.all(promiseArrayFive).then((dataAmtFive) => {
                for (let index = 0; index < dataAmtFive.length; index++) {
                  dataList['getExpensesDetails'] = dataAmtFive[index];
                }
                Promise.all(promiseArraySix).then((dataAmtSix) => {
                  for (let index = 0; index < dataAmtSix.length; index++) {
                    dataList['getFreightDetails'] = dataAmtSix[index];
                  }
                  Promise.all(promiseArraySeven).then((dataAmtSeven) => {
                    for (let index = 0; index < dataAmtSeven.length; index++) {
                      dataList['getDriverSalary'] = dataAmtSeven[index];
                    }Promise.all(promiseArrayEight).then((dataAmtEight) => {
                      for (let index = 0; index < dataAmtEight.length; index++) {
                        dataList['getFreightList'] = dataAmtEight[index];
                      }
                      resolve(dataList);
                    }, error => {
                      reject(error);
                    });
                    //resolve(dataList);
                  }, error => {
                    reject(error);
                  });
                  //resolve(this.dataList);
                }, error => {
                  reject(error);
                });
                //resolve(this.dataList);
              }, error => {
                reject(error);
              });
              //resolve(this.dataList);
            }, error => {
              reject(error);
            });
            //resolve(this.dataList);
          }, (error) => {
            reject(error);
          });
        }, (error) => {
          reject(error);
        });
      }, (error) => {
        reject(error);
      });
    });
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

  getFreightDetails(params?: any) {
    let sql = 'SELECT * FROM freight_details';
    //console.log(sql);
    return this.storage.executeSql(sql, []);
  }

  getExpensesDetails(params?: any) {
    let sql = 'SELECT * FROM expenses_details';
    //console.log(sql);
    return this.storage.executeSql(sql, []);
  }

  getPayment(params?: any) {
    let sql = 'SELECT * FROM payment_details';
    return this.storage.executeSql(sql, []);
  }

  getFreightList(params?: any) {
    let sql = 'SELECT * FROM freight';
    return this.storage.executeSql(sql, []);
  }
}
