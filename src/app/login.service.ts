import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrlLogin = 'http://localhost:8085/api/login'; // Backend login URL
  private apiUrlRegister = 'http://localhost:8085/api/student/add'; // Backend register URL

  constructor(private http: HttpClient) {}

  // Login function
  login(username: string, password: string): Observable<any> {
    return this.http.post(this.apiUrlLogin, { username, password });
  }

  // Register function
  registerStudent(studentData: any): Observable<any> {
    return this.http.post(this.apiUrlRegister, studentData);
  }
}
