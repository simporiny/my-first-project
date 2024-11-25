import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private apiUrl = 'http://localhost:8085/api/history'; // URL for the backend API

  constructor(private http: HttpClient) { }

  addHistory(st_id: number, p_id: number): Observable<any> {
    const historyData = { st_id, p_id };
    return this.http.post<any>(`${this.apiUrl}/add`, historyData) // Make the POST request
  }

  getHistory(): Observable<any> {
    return this.http.get<any>('http://localhost:8085/api/history');
  }
  getHistoryByUsername(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search?username=${username}`);
  }
}
