import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DataTableComponent } from './data-table/data-table.component';
import { HotTableModule } from 'ng2-handsontable';

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule, HotTableModule],
  declarations: [AppComponent, DataTableComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
