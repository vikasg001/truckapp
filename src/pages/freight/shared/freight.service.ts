import {Injectable} from "@angular/core";
import {AppSQLite} from "../../../app/shared/app.sqlite";

@Injectable()

export class FreightService {
  constructor(private storage: AppSQLite) {

  }

  addFreight(tableName: any, object: any) {
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
      let sql = 'INSERT OR REPLACE INTO ' + tableName + ' (' + keys + ') ' + 'VALUES (' + arrayForQuery + ')';
      console.log(sql, dictionaryValues);
      return this.storage.executeSql(sql, dictionaryValues);
    }
  }

  getLastInsertId(tableName: any, coloumName: any) {
    let sql = 'SELECT ' + coloumName + ' FROM ' + tableName + ' ORDER BY ' + coloumName + ' DESC LIMIT 0,1';
    return this.storage.executeSql(sql, []);
  }

  getFreightList(params?: any) {
    let sql = 'SELECT * FROM freight WHERE truckId =' + params.id + ' ORDER BY createdDate DESC';
    console.log(sql);
    const promiseArrayOne = [], promiseArrayTwo = [], promiseArrayThree = [], promiseArrayFour = [],
      promiseArrayFive = [], promiseArraySix = [], promiseArraySeven = [],promiseArrayEight=[];
    return new Promise((resolve, reject) => {
      this.storage.executeSql(sql, []).then(dataList => {
        for (let index = 0; index < dataList.length; index++) {
          promiseArrayOne.push(this.getTotalAmtExpenses({id: dataList[index].id}));
          promiseArrayTwo.push(this.getTotalAmtFreight({id: dataList[index].id}));
          promiseArrayThree.push(this.getTotalPayment({id: dataList[index].id}));
          promiseArrayEight.push(this.getTotalDriverPayment({id: dataList[index].id}));
          promiseArrayFour.push(this.getPayment({id: dataList[index].id}));
          promiseArrayFive.push(this.getExpensesDetails({id: dataList[index].id}));
          promiseArraySix.push(this.getFreightDetails({id: dataList[index].id}));
          promiseArraySeven.push(this.getDriverPayment({id: dataList[index].id}));

        }
        Promise.all(promiseArrayOne).then((dataAmt) => {
          for (let index = 0; index < dataAmt.length; index++) {
            dataList[index].expensesAmt = dataAmt[index][0].expensesAmt;
          }
          Promise.all(promiseArrayTwo).then((dataAmtTwo) => {
            for (let index = 0; index < dataAmtTwo.length; index++) {
              dataList[index].freightAmt = dataAmtTwo[index][0].freightAmt;
            }
            Promise.all(promiseArrayThree).then((dataAmtThree) => {
              for (let index = 0; index < dataAmtThree.length; index++) {
                dataList[index].paymentAmt = dataAmtThree[index][0].paymentAmt;
              }
              Promise.all(promiseArrayEight).then((dataAmtEight) => {
                for (let index = 0; index < dataAmtEight.length; index++) {
                  dataList[index].paymentDriverAmt = dataAmtEight[index][0].paymentDriverAmt || 0;
                }
              Promise.all(promiseArrayFour).then((dataAmtFour) => {
                for (let index = 0; index < dataAmtFour.length; index++) {
                  dataList[index].paymentData = dataAmtFour[index];
                }
                Promise.all(promiseArrayFive).then((dataAmtFive) => {
                  for (let index = 0; index < dataAmtFive.length; index++) {
                    dataList[index].expensesData = dataAmtFive[index];
                  }
                  Promise.all(promiseArraySix).then((dataAmtSix) => {
                    for (let index = 0; index < dataAmtSix.length; index++) {
                      dataList[index].freightData = dataAmtSix[index];
                    }
                    Promise.all(promiseArraySeven).then((dataAmtSeven) => {
                      for (let index = 0; index < dataAmtSeven.length; index++) {
                        dataList[index].paymentDriverData = dataAmtSeven[index];
                      }
                        resolve(dataList);
                      }, function (error) {
                        reject(error);
                      });
                      resolve(dataList);
                    }, function (error) {
                      reject(error);
                    });
                    resolve(dataList);
                  }, function (error) {
                    reject(error);
                  });
                  resolve(dataList);
                }, function (error) {
                  reject(error);
                });
                resolve(dataList);
              }, function (error) {
                reject(error);
              });
              resolve(dataList);
            }, (error) => {
              reject(error);
            });
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

  getTotalAmtFreight(params?: any) {
    let sql = 'SELECT SUM(price) as freightAmt FROM freight_details WHERE frieghtId =' + params.id;
    //console.log(sql);
    return this.storage.executeSql(sql, []);
  }

  getTotalAmtExpenses(params?: any) {
    let sql = 'SELECT (SUM(priceUp)+ SUM(priceDown)) as expensesAmt  FROM expenses_details WHERE frieghtId =' + params.id;
    //console.log(sql);
    return this.storage.executeSql(sql, []);
  }

  getTotalPayment(params?: any) {
    let sql = 'SELECT SUM(paymentAmt) as paymentAmt FROM payment_details WHERE frieghtId =' + params.id;
    //console.log(sql);
    return this.storage.executeSql(sql, []);
  }

  getTotalDriverPayment(params?: any) {
    let sql = 'SELECT SUM(paymentAmt) as paymentDriverAmt FROM payment_driver WHERE frieghtId =' + params.id;
    //console.log(sql);
    return this.storage.executeSql(sql, []);
  }

  getFreightDetails(params?: any) {
    let sql = 'SELECT * FROM freight_details WHERE frieghtId =' + params.id;
    //console.log(sql);
    return this.storage.executeSql(sql, []);
  }

  getExpensesDetails(params?: any) {
    let sql = 'SELECT * FROM expenses_details WHERE frieghtId =' + params.id;
    //console.log(sql);
    return this.storage.executeSql(sql, []);
  }

  getPayment(params?: any) {
    let sql = 'SELECT * FROM payment_details WHERE frieghtId =' + params.id;
    return this.storage.executeSql(sql, []);
  }

  getDriverPayment(params?: any) {
    let sql = 'SELECT * FROM payment_driver WHERE frieghtId =' + params.id;
    return this.storage.executeSql(sql, []);
  }

  updateFreightId(id, trucknumber) {
    let freightNumber = (trucknumber + '-0' + id);
    let sql = 'UPDATE freight SET freightNumber=? WHERE id=?';
    console.log(sql, freightNumber, id);
    return this.storage.executeSql(sql, [freightNumber, id]);
  }
}
