import {Component, ElementRef, ViewChild} from "@angular/core";
import {NavParams} from "ionic-angular";
import {AppStorage} from "../../../app/shared/app.storage";
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import {File} from "@ionic-native/file";
import {AppShared} from "../../../app/shared/app.shared";

@Component({
  selector: 'page-freight-view',
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>Freight View</ion-title>
        <ion-buttons end>
          <button ion-button icon-only (click)="onPrint(editTruckData.freightNumber)">
            <ion-icon name="print"></ion-icon>
          </button>
        </ion-buttons>
      </ion-navbar>
    </ion-header>
    <ion-content no-padding>
      <div #printData [class]="(isPrint==true?'printCss':'')">
        <div class="mainPdf">
          <ion-row>
            <ion-col col-4>
              Date :{{editTruckData.createdDate}}
            </ion-col>
            <ion-col col-4>
              Truck No.: {{editTruckData.truckNumber}}
            </ion-col>
            <ion-col col-4>
              Freight No.:{{editTruckData.freightNumber}}
            </ion-col>
            <ion-col col-4>
              Driver Name : {{getDriverName(editTruckData.driverId)}}
            </ion-col>
            <ion-col col-4>
              Start Date :{{editTruckData.startDate}}
            </ion-col>
            <ion-col col-4>
              End Date :
              {{editTruckData.endDate}}
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col col-5>
              <div class="freight">
                <ion-row><b>Freight</b></ion-row>
                <ion-row>
                  <ion-col col-6>
                    Item
                  </ion-col>
                  <ion-col col-6>
                    Price
                  </ion-col>
                </ion-row>
                <ion-row *ngFor="let freightItem of editTruckData.freightItems; let i=index">
                  <ion-col col-6>
                    {{freightItem.itemName}}
                  </ion-col>
                  <ion-col col-6>
                    {{freightItem.price}}
                  </ion-col>
                </ion-row>
                <ion-row>
                  <ion-col col-6>
                    <b>Total</b>
                  </ion-col>
                  <ion-col col-6>
                    {{editTruckData.freightAmt}}
                  </ion-col>
                </ion-row>
              </div>
            </ion-col>
            <ion-col col-7>
              <div class="expenses">
                <ion-row><b>Expenses</b></ion-row>
                <ion-row>
                  <ion-col col-5>
                    Item
                  </ion-col>
                  <ion-col col-3>
                    Up
                  </ion-col>
                  <ion-col col-4>
                    Down
                  </ion-col>
                </ion-row>
                <ion-row *ngFor="let freightItem of editTruckData.expensesItems; let i=index">
                  <ion-col col-5>
                    {{freightItem.itemName}}
                  </ion-col>
                  <ion-col col-3>
                    {{freightItem.priceUp}}
                  </ion-col>
                  <ion-col col-4>
                    {{freightItem.priceDown}}
                  </ion-col>
                </ion-row>
                <ion-row>
                  <ion-col col-6>
                    <b>Total</b>
                  </ion-col>
                  <ion-col col-6 text-center>
                    {{editTruckData.expensesAmt}}
                  </ion-col>
                </ion-row>
              </div>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col col-4>
              Driver Payment: {{editTruckData.paymentDriverAmt}}
            </ion-col>
            <ion-col col-4>Payment: {{editTruckData.paymentAmt}}
            </ion-col>
            <ion-col col-4>Balance: {{editTruckData.balAmt}}
            </ion-col>
            <ion-col col-12>
              Description : {{editTruckData.payDescription}}
            </ion-col>
          </ion-row>
        </div>
        <div  *ngIf="isPrint">
          -------------------------------------------------------------------------------------
        </div>
        <div  class="secondPdf" *ngIf="isPrint">
          <ion-row>
            <ion-col col-4>
              Date :{{editTruckData.createdDate}}
            </ion-col>
            <ion-col col-4>
              Truck No.: {{editTruckData.truckNumber}}
            </ion-col>
            <ion-col col-4>
              Freight No.:{{editTruckData.freightNumber}}
            </ion-col>
            <ion-col col-4>
              Driver Name : {{getDriverName(editTruckData.driverId)}}
            </ion-col>
            <ion-col col-4>
              Start Date :{{editTruckData.startDate}}
            </ion-col>
            <ion-col col-4>
              End Date :
              {{editTruckData.endDate}}
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col col-5>
              <div class="freight">
                <ion-row><b>Freight</b></ion-row>
                <ion-row>
                  <ion-col col-6>
                    Item
                  </ion-col>
                  <ion-col col-6>
                    Price
                  </ion-col>
                </ion-row>
                <ion-row *ngFor="let freightItem of editTruckData.freightItems; let i=index">
                  <ion-col col-6>
                    {{freightItem.itemName}}
                  </ion-col>
                  <ion-col col-6>
                    {{freightItem.price}}
                  </ion-col>
                </ion-row>
                <ion-row>
                  <ion-col col-6>
                    <b>Total</b>
                  </ion-col>
                  <ion-col col-6>
                    {{editTruckData.freightAmt}}
                  </ion-col>
                </ion-row>
              </div>
            </ion-col>
            <ion-col col-7>
              <div class="expenses">
                <ion-row><b>Expenses</b></ion-row>
                <ion-row>
                  <ion-col col-5>
                    Item
                  </ion-col>
                  <ion-col col-3>
                    Up
                  </ion-col>
                  <ion-col col-4>
                    Down
                  </ion-col>
                </ion-row>
                <ion-row *ngFor="let freightItem of editTruckData.expensesItems; let i=index">
                  <ion-col col-5>
                    {{freightItem.itemName}}
                  </ion-col>
                  <ion-col col-3>
                    {{freightItem.priceUp}}
                  </ion-col>
                  <ion-col col-4>
                    {{freightItem.priceDown}}
                  </ion-col>
                </ion-row>
                <ion-row>
                  <ion-col col-6>
                    <b>Total</b>
                  </ion-col>
                  <ion-col col-6 text-center>
                    {{editTruckData.expensesAmt}}
                  </ion-col>
                </ion-row>
              </div>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col col-4>
              Driver Payment: {{editTruckData.paymentDriverAmt}}
            </ion-col>
            <ion-col col-4>Payment: {{editTruckData.paymentAmt}}
            </ion-col>
            <ion-col col-4>Balance: {{editTruckData.balAmt}}
            </ion-col>
            <ion-col col-12>
              Description : {{editTruckData.payDescription}}
            </ion-col>
          </ion-row>
        </div>
      </div>
    </ion-content>
  `
})

export class FreightViewPage {
  public editTruckData: any;
  @ViewChild('printData') printData: ElementRef;
  public isPrint: boolean = false;

  constructor(private navParams: NavParams, private file: File, private appShared: AppShared) {
    this.editTruckData = this.navParams.get('editTruckData');
    console.log(this.editTruckData);

  }

  ionViewWillEnter() {

  }

  getDriverName(driverId: number) {
    let DriverList = AppStorage.getItem('DriverList');
    for (let i = 0; i < DriverList.length; i++) {
      if (DriverList[i].id == driverId) {
        return DriverList[i].driverName;
      }
    }
  }

  onPrint(freightNumber: any, freightDate: any) {
    if (!this.isPrint) {
      this.isPrint = true;
      this.appShared.showAlert("Mesaage","Print preview click again to save pdf.");
      return false;
    }

    this.appShared.showLoading();
    console.log('Print Doc', this.printData.nativeElement, new jsPDF());
    html2canvas(this.printData.nativeElement).then(canvas => {

      let img = canvas.toDataURL("image/png");
      let doc = new jsPDF('p','pt','a4');
      let width = doc.internal.pageSize.width;
      let height = doc.internal.pageSize.height-10;
      doc.addImage(img, 'PNG', 10, 10, width, height);
      doc.save(freightNumber + 'testCanvas.pdf');
      let pdfOutput = doc.output();
      // using ArrayBuffer will allow you to put image inside PDF
      let buffer = new ArrayBuffer(pdfOutput.length);
      let array = new Uint8Array(buffer);
      for (let i = 0; i < pdfOutput.length; i++) {
        array[i] = pdfOutput.charCodeAt(i);
      }
      const directory = this.file.externalRootDirectory;
      const fileName = freightNumber + 'tapp.pdf';
      this.file.checkDir(directory, 'TrackAppData').then(() => {
        this.savePdf(directory, fileName, buffer);
      }, err => {
        this.file.createDir(directory, 'TrackAppData', false).then(() => {
          this.savePdf(directory, fileName, buffer);
        });
      })
    });
  }

  savePdf(directory, fileName, buffer) {
    let path = directory + '/TrackAppData';
    let options = {create: false, replace: true};
    this.file.writeFile(path, fileName, buffer, options).then(succ => {
        console.log("File write success : ", succ);
        let fileEntry = succ['nativeURL'];
        this.appShared.hideLoading();
        this.appShared.showAlert('Success', fileEntry);
      },
      err => {
        console.log(" write File error : ", err);
        this.appShared.hideLoading();
      });
  }
}
