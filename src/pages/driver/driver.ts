import {Component} from '@angular/core';
import {NavController, NavParams} from "ionic-angular";
import {AdddriverPage} from "./adddriver/adddriver";
import {DriverService} from "./shared/driver.serivce";
import {LoginPage} from "../login/login";
import {AppStorage} from "../../app/shared/app.storage";


@Component({
  selector: 'page-driver',
  templateUrl: 'driver.html',
})
export class DriverPage {
  public infiniteScrollbool: boolean = false;
  public driverList: any;
  private params: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private driverService: DriverService) {

  }

  ionViewWillEnter() {
    this.driverService.getDriverList(this.params).then((data) => {
      this.driverList = data;
      AppStorage.setItem('DriverList', data);
      console.log('ionViewDidLoad Driver', this.driverList);
    });
  }

  addDriver(driverData?: any) {
    this.navCtrl.push(AdddriverPage, {'driverData': driverData});
  }

  logout() {
    this.driverService.logout();
    this.navCtrl.setRoot(LoginPage);
  }

}
