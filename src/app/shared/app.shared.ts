/**
 * Created by npandey on 3/28/2017.
 */

import {Injectable} from '@angular/core';
import {AlertController, Config, App} from "ionic-angular";
import {AppStorage} from "./app.storage";
import {NsCustomLoaderOptions} from "./NsCustomLoader/NsCustomLoader";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AppShared {

  private nsCustomLoading = new Subject<NsCustomLoaderOptions>();

  /**
   * @description This is AppShared Class used Globally in App.
   * @param app
   * @param config
   * @param alertCtrl
   */
  constructor(public app: App, public config: Config, public alertCtrl: AlertController) {
  }

  nsCustomLoadingSubject(): Subject<NsCustomLoaderOptions> {
    return this.nsCustomLoading;
  }

  /**
   * @description show app loading indicator
   */
  public showLoading(content?: string) {
    const loadingOptions: NsCustomLoaderOptions = {
      content: content || 'Please wait...',
      show: true
    };
    this.nsCustomLoading.next(loadingOptions);
  }

  /**
   * @description hide app loading indicator
   */
  public hideLoading() {
    const loadingOptions: NsCustomLoaderOptions = {
      show: false
    };
    this.nsCustomLoading.next(loadingOptions);
  }

  public showAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  /**
   * @description show some confirmation dialog
   * @param title
   * @param message
   * @param button
   */
  public showConfirm(title: string, message: string, button: string[]): Observable<boolean> {
    return new Observable((obs) => {
      let confirm = this.alertCtrl.create({
        title: title,
        message: message,
        buttons: [
          {
            text: button[1],
            handler: () => {
              //not confirm
              obs.next(false);
              obs.complete();
            }
          },
          {
            text: button[0],
            handler: () => {
              //confirm
              obs.next(true);
              obs.complete();
            }
          }
        ],
        enableBackdropDismiss: false
      });
      confirm.present();
    });
  }

  public get userName(): string {
    return JSON.parse(AppStorage.getItem('userData')).FName;
  }

}

export function getCustomIsoStringFromTimeStamp(dateObj) {

  const pad = (number) => {
    if (number < 10) {
      return '0' + number;
    }
    return number;
  };
  return dateObj.getFullYear() +
    '-' + pad(dateObj.getMonth() + 1) +
    '-' + pad(dateObj.getDate());
}
