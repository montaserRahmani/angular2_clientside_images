import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { UploaderComponent } from './uploader/uploader.component';
import { ViewImagesComponent } from './view-images/view-images.component';

@NgModule({
  declarations: [
    AppComponent,
    UploaderComponent,
    ViewImagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
