import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private apiUrl = 'http://localhost:8085/api/history'; // URL for the backend API

  constructor(private http: HttpClient) { }

  // Method to insert history data
  addHistory(st_id: number, p_id: number): Observable<any> {
    const historyData = { st_id, p_id }; // Creating the data object to send
    return this.http.post<any>(`${this.apiUrl}/add`, historyData); // Make the POST request
  }
}
