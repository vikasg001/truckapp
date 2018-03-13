import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DriverService} from "../driver/shared/driver.serivce";
import {AppStorage} from "../../app/shared/app.storage";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  public driverList: any;
  public driverId: any;
  public salaryList: any = [];

  constructor(public navCtrl: NavController, private driverService: DriverService) {

  }

  ionViewWillEnter() {
    this.driverList = AppStorage.getItem('DriverList');
    this.driverId = this.driverList[0].id;
    this.getDriverPaymentList(this.driverId);
  }

  getDriverId(ev: any) {
    console.log(ev);
    this.driverId = ev;
    this.getDriverPaymentList(this.driverId);
  }

  getDriverPaymentList(driverId: any) {
    this.driverService.getDriverSalary({id: this.driverId}).then(dataList => {
      console.log(dataList);
      this.salaryList = dataList;
    }, error => {
      console.log(error);
    })
  }

}
