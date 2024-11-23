import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudencrudComponent } from './studencrud/studencrud.component';  // Import your component
import { PackageComponent } from './package/package.component';  // Import other components
import { BookingComponent } from './booking/booking.component';  // Import other components
import { LoginComponent } from './login/login.component';  // Import other components
import { HistoryComponent } from './history/history.component';
import { HistorySearchComponent } from './history-search/history-search.component';

const routes: Routes = [
  { path: 'user', component: StudencrudComponent },
  { path: 'package', component: PackageComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'historysearch', component: HistorySearchComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }  // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
