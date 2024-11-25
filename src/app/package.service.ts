import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  private apiUrl = 'http://localhost:8085/api/package';

  constructor(private http: HttpClient) { }

  getPackages(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  updatePackageLeft(packageId: number, decrementValue: number): Observable<any> {
    const url = `http://localhost:8085/api/package/update/package_left/${packageId}`;
    return this.http.put<any>(url, { decrementValue });
  }
  
}

