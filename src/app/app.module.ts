import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AgendaComponent } from './agenda/agenda.component';
import { CalendrierComponent } from './agenda/calendrier/calendrier.component';

@NgModule({
  declarations: [
    AppComponent,
    AgendaComponent,
    CalendrierComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
