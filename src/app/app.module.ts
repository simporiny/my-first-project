import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudencrudComponent } from './studencrud/studencrud.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PackageComponent } from './package/package.component';
import { BookingComponent } from './booking/booking.component';
import { HistoryComponent } from './history/history.component';
import { HistorySearchComponent } from './history-search/history-search.component';

@NgModule({
  declarations: [
    AppComponent,
    StudencrudComponent,
    PackageComponent,
    HistorySearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BookingComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
