import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BasicLineChartComponent } from './line-chart/line-chart.component';

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule
    ],
  declarations: [
    AppComponent,
    BasicLineChartComponent
    ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
