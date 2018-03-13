import {Component} from "@angular/core";
import {LoginPage} from "../../login/login";
import {NavController, NavParams} from "ionic-angular";
import {DriverService} from "../../driver/shared/driver.serivce";
import {FreightService} from "../shared/freight.service";
import {FreightPage} from "../freight";
import {Validators} from "@angular/forms";
import {AppShared} from "../../../app/shared/app.shared";
import {FreightViewPage} from "./freight-view";

@Component({
  selector: 'page-freight-list',
  templateUrl: 'freight-list.html'
})

export class FreightListPage {
  public freightList: any = [];
  public expensesAmt: any;
  public freightAmt: any;
  public paymentAmt: any;
  private balAmt: any;
  public truckData: any;
  private paymentData: any;
  private truck_no: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private driverService: DriverService, private freightService: FreightService, private appShared: AppShared) {

  }

  ionViewWillEnter() {
    this.truckData = this.navParams.get('truckData');
    this.appShared.showLoading();
    this.freightService.getFreightList(this.truckData).then(dataList => {
      this.freightList = dataList;
      this.balAmt = this.getBalAmt(dataList);
      this.appShared.hideLoading();
      console.log("freightList", this.freightList);
      this.truck_no = this.truckData.truck_no;

    }, err => {
      console.log(err);
      this.appShared.hideLoading();
    });
  }


  getBalAmt(freightList: any) {
    let bal = 0;
    for (let index = 0; index < freightList.length; index++) {
      bal = bal + (freightList[index].paymentAmt);
    }
    return bal.toFixed(2);
  }

  logout() {
    this.driverService.logout();
    this.navCtrl.setRoot(LoginPage);
  }

  onCheckout() {
    this.navCtrl.push(FreightPage, {'truckData': this.truckData});
  }

  getSingleBal(freightData: any) {
    let bal = 0;
    bal = (freightData.freightAmt - (freightData.expensesAmt + freightData.paymentDriverAmt + freightData.paymentAmt));
    return bal.toFixed(2);
  }

  editFreight(params: any) {
    let editfreightForm = {
      'id': params.id,
      'createdDate': params.createdDate,
      'truckId': params.truckId,
      'truckNumber': params.truckNumber,
      'freightNumber': params.freightNumber,
      'startDate': params.startDate,
      'endDate': params.endDate,
      'driverId': params.driverId,
      'freightItems': params.freightData,
      'expensesItems': params.expensesData,
      'paymentAmt': params.paymentData.length > 0 ? params.paymentData[0].paymentAmt : 0,
      'payDescription': params.paymentData.length > 0 ? params.paymentData[0].payDescription : '',
      'paymentId': params.paymentData.length > 0 ? params.paymentData[0].id : null,
      'paymentDriverAmt': params.paymentDriverData.length > 0 ? params.paymentDriverData[0].paymentAmt : 0,
      'payDriverDescription': params.paymentDriverData.length > 0 ? params.paymentDriverData[0].payDescription : '',
      'paymentDriverId': params.paymentDriverData.driverId,
    };
    this.navCtrl.push(FreightPage, {'editTruckData': editfreightForm});
  }

  viewFreight(params: any) {
    let editfreightForm = {
      'id': params.id,
      'createdDate': params.createdDate,
      'truckId': params.truckId,
      'truckNumber': params.truckNumber,
      'freightNumber': params.freightNumber,
      'startDate': params.startDate,
      'endDate': params.endDate,
      'driverId': params.driverId,
      'freightItems': params.freightData,
      'expensesItems': params.expensesData,
      'freightAmt': params.freightAmt,
      'expensesAmt': params.expensesAmt,
      'balAmt': this.getSingleBal(params),
      'paymentAmt': params.paymentData.length > 0 ? params.paymentData[0].paymentAmt : 0,
      'payDescription': params.paymentData.length > 0 ? params.paymentData[0].payDescription : '',
      'paymentId': params.paymentData.length > 0 ? params.paymentData[0].id : null,
      'paymentDriverAmt': params.paymentDriverData.length > 0 ? params.paymentDriverData[0].paymentAmt : 0,
      'payDriverDescription': params.paymentDriverData.length > 0 ? params.paymentDriverData[0].payDescription : '',
      'paymentDriverId': params.paymentDriverData.driverId,
    };
    this.navCtrl.push(FreightViewPage, {'editTruckData': editfreightForm});
  }
}
