import {Component} from '@angular/core';
import {NavController, NavParams} from "ionic-angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DriverService} from "../../driver/shared/driver.serivce";
import {getCustomIsoStringFromTimeStamp} from "../../../app/shared/app.shared";

@Component({
  selector: 'page-addtruck',
  templateUrl: 'addtruck.html',
})
export class AddTruckPage {
  public addTruckForm: FormGroup;
  private submitAttempt: boolean;
  private truckData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private driverService: DriverService) {
    this.addTruckForm = this.formBuilder.group({
      "id": [],
      "truck_no": ['', Validators.compose([Validators.required])],
      "insuranceDueDate": [''],
      "permitDueDate": [''],
      "taxDueDate": [''],
      "fitnessDueDate": [''],
      "pollutionDueDate": [''],
      "description": [''],
      "createdDate": [],
    });
  }

  ionViewDidLoad() {

    this.truckData = this.navParams.get('truckData');
    console.log('ionViewDidLoad Addtruck', this.truckData);
    if (typeof this.truckData != 'undefined') {
      this.addTruckForm.reset(this.truckData);
    } else {
      this.addTruckForm.controls.createdDate.setValue(getCustomIsoStringFromTimeStamp(new Date()));
    }
  }

  addTruckFormSubmit(formInput: any) {
    this.submitAttempt = true;
    if (!this.addTruckForm.valid) {
      return false;
    }
    this.driverService.addTruck(formInput).then(() => {
      this.navCtrl.pop();
    }, (error) => {
      console.log(error)
    });
  }


}
