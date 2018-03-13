/**
 * Created by nsingh on 5/24/2017.
 */
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {NsCustomLoader} from "./NsCustomLoader";
import {IonicModule} from "ionic-angular";
import {BrowserModule} from "@angular/platform-browser";
@NgModule({
  declarations: [NsCustomLoader],
  imports: [IonicModule, BrowserModule],
  exports: [NsCustomLoader],
  entryComponents: [NsCustomLoader],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NsCustomLoadingModule {

}
