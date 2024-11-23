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
import { HistorySearchComponent } from './history-search/history-search.component'; // import BookingComponent

@NgModule({
  declarations: [
    AppComponent,
    StudencrudComponent,
    PackageComponent,
    HistorySearchComponent
    // No need to declare BookingComponent here
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BookingComponent // Import the BookingComponent here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
