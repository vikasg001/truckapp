import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {DriverService} from "../driver/shared/driver.serivce";
import {AppStorage} from "../../app/shared/app.storage";
import {HomeService} from "./shared/home.service";
import {AppShared} from "../../app/shared/app.shared";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private synData: any = [];

  constructor(public navCtrl: NavController, private homeService: HomeService, private appShared: AppShared) {

  }

  ionViewWillEnter() {
    this.appShared.showLoading();
    let self = this;
    this.homeService.getAllDataSyn().then(synData => {
      let getData = [];
      getData.push(synData['getDriverList']);
      getData.push(synData['getDriverSalary']);
      getData.push(synData['getExpensesDetails']);
      getData.push(synData['getFreightDetails']);
      getData.push(synData['getPayment']);
      getData.push(synData['getTruckList']);
      getData.push(synData['getUserData']);
      getData.push(synData['getFreightList']);

      self.synData = getData;
      self.appShared.hideLoading();
    }, error => {
      this.appShared.hideLoading();
      console.log(error);
    });
  }

  logout() {
    this.homeService.logout();
    this.navCtrl.setRoot(LoginPage);
  }

  onSync() {
    this.appShared.showLoading();
    console.log("sync here");
    this.homeService.postSynData({"Syncdata": this.synData}).subscribe(dataSub => {
      this.appShared.hideLoading();
      console.log(dataSub);
      let message = "";
      dataSub.forEach((messageData) => {
        message += messageData + "<br>";
      })

      this.appShared.showAlert("Sync Message", message);

    }, error => {

      if(!error.ok){
        this.appShared.showAlert("Error Message", "ERR_CONNECTION_REFUSED");
      }
      this.appShared.hideLoading();
      console.log(error);
    });

  }

}
