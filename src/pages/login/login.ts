import {Component} from '@angular/core';
import {NavController, NavParams} from "ionic-angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TruckPage} from "../truck/truck";
import {AppStorage} from "../../app/shared/app.storage";
import {AppConstant} from "../../app/shared/app.constant";
import {DriverService} from "../driver/shared/driver.serivce";
import {AppShared} from "../../app/shared/app.shared";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  userData = {username: '', password: ''};
  public submitAttempt: boolean;
  public appVersion: string = AppConstant.APP_VERSION;
  public signInForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private driverService: DriverService, private appShared: AppShared) {

    this.signInForm = this.formBuilder.group({
      "username": ['', Validators.compose([Validators.required])],
      "password": ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
    if (!AppStorage.getItem('RegisterUser')) {
      this.driverService.addLoginUser().then((data) => {
        console.log(data);
      }, (error) => {
        console.log(error)
      });
    }
  }

  login(value: any) {
    this.submitAttempt = true;
    if (!this.signInForm.valid) {
      return false;
    }
    this.driverService.loginUser(value).then(data => {
      console.log(data);
      AppStorage.setItem('userLogin', true);
      if(data.length > 0){
        this.navCtrl.setRoot(TruckPage);
      }else{
        this.appShared.showAlert('Alert', 'Login Username/Password not valid');
      }
    }, error => {
      this.appShared.showAlert('Alert', 'Login Username/Password not valid');
    })


  }

}
