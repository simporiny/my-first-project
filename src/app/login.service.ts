import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrlLogin = 'http://localhost:8085/api/login'; 
  private apiUrlRegister = 'http://localhost:8085/api/student/add'; 

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.apiUrlLogin, { username, password });
  }

  registerStudent(studentData: any): Observable<any> {
    return this.http.post(this.apiUrlRegister, studentData);
  }
}
