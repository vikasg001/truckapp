import {Component} from '@angular/core';
import {AlertController, NavController, NavParams, Select} from "ionic-angular";
import {AddTruckPage} from "./addtruck/addtruck";
import {DriverService} from "../driver/shared/driver.serivce";
import {LoginPage} from "../login/login";
import {FreightListPage} from "../freight/freight-list/freight-list";
import {AppShared, getCustomIsoStringFromTimeStamp} from "../../app/shared/app.shared";

@Component({
  selector: 'page-truck',
  templateUrl: 'truck.html'
})

export class TruckPage {

  public truckList: any;
  private params: any;
  private alertMessage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private driverService: DriverService, private alertCtrl: AlertController, private appShared: AppShared) {

  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad Truck');
    this.driverService.getTruckList(this.params).then((data) => {
      this.truckList = data;
      console.log('ionViewDidLoad Driver', this.truckList);
    });

  }

  filterVehicleList() {

  }

  getEnableNotification(paramsData?: any) {
    let message = "";
    let currentDate = this.getTimeStamp(getCustomIsoStringFromTimeStamp(new Date()));
    if (currentDate >= this.getTimeStamp(paramsData.insuranceDueDate)) {
      message += " Insurance Due Date Over<br/>";
    }
    if (currentDate >= this.getTimeStamp(paramsData.taxDueDate)) {
      message += " Tax Due Date Over<br/>";
    }
    if (currentDate >= this.getTimeStamp(paramsData.fitnessDueDate)) {
      message += " Fitness Due Date Over<br/>";
    }
    if (currentDate >= this.getTimeStamp(paramsData.pollutionDueDate)) {
      message += " Pollution Due Date Over<br/>";
    }
    if (currentDate >= this.getTimeStamp(paramsData.permitDueDate)) {
      message += " Permit Due Date Over<br/>";
    }
    if (message != "") {
      this.alertMessage = message;
      return true;
    }

  }

  messageAlert() {
    this.appShared.showAlert('Alert', this.alertMessage);
  }


  onFreightList(truckData) {
    this.navCtrl.push(FreightListPage, {'truckData': truckData});
  }

  addVehicle(truckData?: any) {
    this.navCtrl.push(AddTruckPage, {'truckData': truckData});
  }

  logout() {
    this.driverService.logout();
    this.navCtrl.setRoot(LoginPage);
  }

  getTimeStamp(d: any) {
    if (d != "") {
      let dateObj = new Date(d);
      return dateObj.getTime();
    } else {
      return 99999999999999;
    }
  }


}
