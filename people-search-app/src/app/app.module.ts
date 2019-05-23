import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { MatInputModule, MatTableModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule} from '@angular/material';
import { PeopleSearchTableComponent } from './people-search-table/people-search-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PeopleSearchTableDataSource } from './people-search-table/people-search-table-datasource';
import { Configuration } from './app.constants';

@NgModule({
  declarations: [
    AppComponent,
    PeopleSearchTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [HttpClientModule,
  PeopleSearchTableDataSource,
  Configuration],
  bootstrap: [AppComponent]
})
export class AppModule { }
