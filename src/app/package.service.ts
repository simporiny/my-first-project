import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  private apiUrl = 'http://localhost:8085/api/package'; // URL for the backend API

  constructor(private http: HttpClient) { }

  // Method to get all packages from the database
  getPackages(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Method to update package_left
  updatePackageLeft(packageId: number, decrementValue: number): Observable<any> {
    const url = `http://localhost:8085/api/package/update/package_left/${packageId}`;
    return this.http.put<any>(url, { decrementValue });
  }
  
}

