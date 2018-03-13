import {Component} from '@angular/core';
import {NavController, NavParams} from "ionic-angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DriverService} from "../shared/driver.serivce";

@Component({
  selector: 'page-adddriver',
  templateUrl: 'adddriver.html',
})
export class AdddriverPage {
  public driverForm: FormGroup;
  private submitAttempt: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private driverService: DriverService) {
    this.driverForm = this.formBuilder.group({
      "id": [],
      "driverName": ['', Validators.compose([Validators.required])],
      "licenceNumber": [''],
      "salary": [''],
      "address": [''],
      "mobile": ['', Validators.compose([Validators.required])],
      "dateofjoin": ['']
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Adddriver');
    let driverData = this.navParams.get('driverData');
    console.log('ionViewDidLoad Addtruck', driverData);
    if (typeof driverData != 'undefined') {
      this.driverForm.reset(driverData);
    }
  }

  addDriverFormSubmit(formInput: any) {
    this.submitAttempt = true;
    if (!this.driverForm.valid) {
      return false;
    }
    this.driverService.addDriver(formInput).then(() => {
      this.navCtrl.pop();
    }, (error) => {
      console.log(error)
    });
    ;
  }
}
