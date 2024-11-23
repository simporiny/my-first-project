import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient for API calls
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'http://localhost:8085/api/student'; // Set your API URL

  constructor(private http: HttpClient) { }

  // Method to fetch all students
  getStudents(): Observable<any> {
    return this.http.get<any>(this.apiUrl); // Make the GET request to fetch student data
  }
}
