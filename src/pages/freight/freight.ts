import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from "ionic-angular";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppStorage} from "../../app/shared/app.storage";
import {FreightService} from "./shared/freight.service";
import {AppShared, getCustomIsoStringFromTimeStamp} from "../../app/shared/app.shared";

@Component({
  selector: 'page-freight',
  templateUrl: 'freight.html',
})
export class FreightPage implements OnInit {
  public submitAttempt: boolean;
  public freightForm: FormGroup;
  private truckData: any;
  public driverList: any;
  private editTruckData: any;
  public freightParams: any = {
    'id': null,
    'frieghtId': '',
    'itemName': '',
    'price': ''
  };
  public expensesParams: any = {
    'id': null,
    'frieghtId': '',
    'itemName': '',
    'priceUp': '',
    'priceDown': '',
  };
  private minToDate: any;
  private createdDate: any;
  public totalFreights: string = "";
  public totalExpens: string = "";
  public driverPayment: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private freightService: FreightService, private appShared: AppShared) {

    this.freightForm = this.formBuilder.group({
      'id': [],
      'truckId': [],
      'truckNumber': ['', Validators.compose([Validators.required])],
      'freightNumber': [''],
      'startDate': ['', Validators.compose([Validators.required])],
      'endDate': ['', Validators.compose([Validators.required])],
      'driverId': ['', Validators.compose([Validators.required])],
      'freightItems': this.formBuilder.array([]),
      'expensesItems': this.formBuilder.array([]),
      'paymentAmt': [0, Validators.compose([Validators.required])],
      'payDescription': ['', Validators.compose([Validators.required])],
      'paymentId': [],
      'paymentDriverAmt': [0, Validators.compose([Validators.required])],
      'payDriverDescription': [''],
      'paymentDriverId': [],
      'createdDate': [],
    });

    this.freightForm.controls['startDate'].valueChanges.subscribe((value) => {
      this.minToDate = value;
    });
  }

  ngOnInit(): void {
    this.freightForm.controls["freightItems"].valueChanges.subscribe((value) => this.totalFreight(value));
    this.freightForm.controls["expensesItems"].valueChanges.subscribe((value) => this.totalExpenses(value));
    this.freightForm.controls["paymentDriverAmt"].valueChanges.subscribe((value) => this.totalDriverPayment(value));
  }

  get freightItems(): FormArray {
    return this.freightForm.get('freightItems') as FormArray;
  }

  get expensesItems(): FormArray {
    return this.freightForm.get('expensesItems') as FormArray;
  }

  freightFormSubmit(formInput: any) {
    this.submitAttempt = true;
    if (!this.freightForm.valid) {
      return false;
    }
    //formInput.freightItems = this.anArray;
    console.log(formInput, this.submitAttempt);

    let freightDetails = {
      id: formInput.id,
      truckId: formInput.truckId,
      truckNumber: formInput.truckNumber,
      freightNumber: formInput.freightNumber,
      startDate: formInput.startDate,
      endDate: formInput.endDate,
      driverId: formInput.driverId,
      createdDate: formInput.createdDate,
    };
    this.appShared.showLoading();
    if (formInput.id) {
      this.freightService.addFreight('freight', freightDetails).then((data) => {
        //this.updateFreightNumber(formInput.id, formInput.truckNumber);
        this.insertExpData(formInput.id, formInput.expensesItems);
        this.insertFrieghtData(formInput.id, formInput.freightItems);
        this.insertPayment(formInput.id, formInput);
        this.insertDriverPayment(formInput.id, formInput);
        this.appShared.hideLoading();
      });
    } else {
      this.freightService.addFreight('freight', freightDetails).then((data) => {
        this.freightService.getLastInsertId('freight', 'id').then((data) => {
          this.updateFreightNumber(data[0].id, formInput.truckNumber);
          this.insertExpData(data[0].id, formInput.expensesItems);
          this.insertFrieghtData(data[0].id, formInput.freightItems);
          this.insertPayment(data[0].id, formInput);
          this.insertDriverPayment(data[0].id, formInput);
          this.appShared.hideLoading();
        });
      });
    }
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad Freight');
    this.driverList = AppStorage.getItem('DriverList');
    this.truckData = this.navParams.get('truckData');
    this.editTruckData = this.navParams.get('editTruckData');
    console.log('ionViewDidLoad Freight', this.truckData);
    console.log('ionViewDidLoad Freight', this.editTruckData);
    if (typeof this.truckData != 'undefined') {
      this.freightForm.controls.truckNumber.setValue(this.truckData.truck_no);
      this.freightForm.controls.truckId.setValue(this.truckData.id);
      this.freightForm.controls.createdDate.setValue(getCustomIsoStringFromTimeStamp(new Date()));
      this.createdDate = getCustomIsoStringFromTimeStamp(new Date());
    } else {
      this.freightForm.reset(this.editTruckData);
      this.createdDate = this.editTruckData.createdDate,
        this.editTruckData.freightItems.forEach((freightEdit, i) => {
          this.Add(freightEdit);
        });

      this.editTruckData.expensesItems.forEach((expensesEdit, i) => {
        this.addExpenses(expensesEdit);
      });
    }
  }


  Add(params?: any) {
    console.log(this.freightForm.controls.freightItems['controls']);
    this.freightItems.push(this.addSubData({
      'id': params.id,
      'frieghtId': params.frieghtId,
      'itemName': params.itemName,
      'price': params.price
    }));
  }

  addExpenses(params?: any) {
    this.expensesItems.push(this.addExpData({
      'id': params.id,
      'frieghtId': params.frieghtId,
      'itemName': params.itemName,
      'priceUp': params.priceUp,
      'priceDown': params.priceDown,
    }));
  }

  addSubData(values) {
    return this.formBuilder.group({
      "id": [values.id],
      "frieghtId": [values.frieghtId],
      "itemName": [values.itemName],
      "price": [values.price]
    });
  }

  addExpData(values) {
    return this.formBuilder.group({
      "id": [values.id],
      "frieghtId": [values.frieghtId],
      "itemName": [values.itemName],
      "priceUp": [values.priceUp],
      "priceDown": [values.priceDown]
    });
  }

  private insertExpData(id: number, expensesItems: any) {
    console.log(id, expensesItems);
    for (let e = 0; e < expensesItems.length; e++) {
      if (expensesItems[e].itemName != '') {
        let expenses_details = {
          id: expensesItems[e].id,
          frieghtId: id,
          itemName: expensesItems[e].itemName,
          priceDown: expensesItems[e].priceDown,
          priceUp: expensesItems[e].priceUp
        };
        this.freightService.addFreight('expenses_details', expenses_details).then((data) => {
        });
      }
    }
  }

  private insertFrieghtData(id: number, freightItems: any) {
    console.log(id, freightItems);
    for (let e = 0; e < freightItems.length; e++) {
      if (freightItems[e].itemName != '') {
        let frieght_details = {
          id: freightItems[e].id,
          frieghtId: id,
          itemName: freightItems[e].itemName,
          price: freightItems[e].price
        };
        this.freightService.addFreight('freight_details', frieght_details).then((data) => {

        });
      }
    }
  }

  private insertPayment(id: number, formInput) {
    let payment_details = {
      id: formInput.paymentId,
      frieghtId: id,
      payDescription: formInput.payDescription,
      paymentAmt: formInput.paymentAmt,
      createdDate: formInput.createdDate,
    };
    this.freightService.addFreight('payment_details', payment_details).then((data) => {
      console.log(data);
    });
  }

  private insertDriverPayment(id: number, formInput) {
    let payment_details = {
      id: formInput.paymentDriverId,
      frieghtId: id,
      driverId: formInput.driverId,
      payDescription: formInput.payDriverDescription,
      paymentAmt: formInput.paymentDriverAmt,
      createdDate: formInput.createdDate,
    };
    this.freightService.addFreight('payment_driver', payment_details).then((data) => {
      console.log(data);
      this.navCtrl.pop();
    });
  }


  private updateFreightNumber(id: any, truckNumber: any) {
    this.freightService.updateFreightId(id, truckNumber).then(data => {
      console.log(data);
    }, err => {
      console.log(err);
    })
  }

  private totalFreight(value: any) {
    let totalAmount = 0;
    value.forEach((data) => {
      if (data.price > 0) {
        totalAmount += parseFloat(data.price);
      }
    });
    this.totalFreights = totalAmount.toFixed(2);
    // console.log(this.totalFreights);
  }

  private totalExpenses(value: any) {
    let totalAmount = 0;
    value.forEach((data, index) => {
      //console.log("total f", data);
      if (data.priceUp > 0) {
        totalAmount += (parseFloat(data.priceUp) + parseFloat(data.priceDown));
      }
    });
    this.totalExpens = totalAmount.toFixed(2);
  }

  private totalDriverPayment(value: any) {
    let totalAmount = 0;
    if (value > 0) {
      totalAmount += (parseFloat(value));
    }
    this.driverPayment = totalAmount.toFixed(2);
  }

  getBalAmount(f, e, d) {
    let bal = parseFloat(f) - (parseFloat(e) + parseFloat(d));
    return bal;
  }
}
