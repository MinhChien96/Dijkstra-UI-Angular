import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DijkstraComponent } from './dijkstra/dijkstra.component';
import { FormsModule } from '@angular/forms';
import {GrowlModule} from 'primeng/growl';
import {ButtonModule} from 'primeng/button';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';



@NgModule({
  declarations: [
    AppComponent,
    DijkstraComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    GrowlModule,
    ButtonModule,
    MessagesModule,
    MessageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
