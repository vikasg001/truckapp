import {Component, ViewChild} from '@angular/core';
import {Menu, Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import {AppStorage} from "./shared/app.storage";
import {TruckPage} from "../pages/truck/truck";
import {DriverPage} from "../pages/driver/driver";
import {TabsPage} from "../pages/tabs/tabs";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  @ViewChild(Menu) mainMenu: Menu;
  rootPage: any;
  pages: Array<{ title: string, component: any, icon: string }>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.pages = [
        {title: 'Home', component: TabsPage, icon: 'home'},
        {title: 'Truck List', component: TruckPage, icon: 'car'},
        {title: 'Driver List', component: DriverPage, icon: 'person'},
      ];
      if (AppStorage.getItem('userLogin')) {
        this.openPage({component: TruckPage, icon: 'home'});
      } else {
        this.openPage({component: LoginPage, icon: 'home'});
      }
    });
  }


  openPage(page) {
    this.nav.setRoot(page.component).then(() => {
      this.mainMenu.close();
    })
  }
}
