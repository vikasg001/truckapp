import {NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {AboutPage} from '../pages/about/about';
import {ContactPage} from '../pages/contact/contact';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import {TruckPage} from "../pages/truck/truck";
import {FreightPage} from "../pages/freight/freight";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppStorage} from "./shared/app.storage";
import {AppLogger} from "./shared/app.log";
import {AddTruckPage} from "../pages/truck/addtruck/addtruck";
import {DriverPage} from "../pages/driver/driver";
import {AdddriverPage} from "../pages/driver/adddriver/adddriver";
import {AppSQLite} from "./shared/app.sqlite";
import {DriverService} from "../pages/driver/shared/driver.serivce";
import {FreightService} from "../pages/freight/shared/freight.service";
import {FreightListPage} from "../pages/freight/freight-list/freight-list";
import {AppShared} from "./shared/app.shared";
import {FreightViewPage} from "../pages/freight/freight-list/freight-view";
import {SQLite} from "@ionic-native/sqlite";
import {NsCustomLoadingModule} from "./shared/NsCustomLoader/NsCustomLoadingModule";
import {File} from "@ionic-native/file";
import {FileTransfer} from "@ionic-native/file-transfer";
import {HttpModule} from "@angular/http";
import {HomeService} from "../pages/home/shared/home.service";


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    TruckPage,
    FreightPage,
    AddTruckPage,
    DriverPage,
    AdddriverPage,
    FreightListPage,
    FreightViewPage
  ],
  imports: [
    NsCustomLoadingModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ReactiveFormsModule,
    FormsModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    TruckPage,
    FreightPage,
    AddTruckPage,
    DriverPage,
    AdddriverPage,
    FreightListPage,
    FreightViewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    }, AppLogger, AppStorage, SQLite, AppSQLite, DriverService, FreightService, AppShared, File, FileTransfer, HomeService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
