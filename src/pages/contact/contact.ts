import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AppStorage} from "../../app/shared/app.storage";
import {DriverService} from "../driver/shared/driver.serivce";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  public paymentList: any;

  constructor(public navCtrl: NavController, private driverService: DriverService) {

  }

  ionViewWillEnter() {
    this.getDriverPaymentList();
  }

  getDriverPaymentList() {
    this.driverService.getMyPayment().then(dataList => {
      console.log(dataList);
      this.paymentList = dataList;
    }, error => {
      console.log(error);
    })
  }

  getDriverName(driverId: number) {
    let DriverList = AppStorage.getItem('DriverList');
    for (let i = 0; i < DriverList.length; i++) {
      if (DriverList[i].id == driverId) {
        return DriverList[i].driverName;
      }
    }
  }
}
