import { Component,OnInit } from '@angular/core';
import { HistoryService } from '../history.service'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-history-search',
  standalone: false,
  templateUrl: './history-search.component.html',
  styleUrls: ['./history-search.component.scss'],
  // imports: [CommonModule, FormsModule]
})
export class HistorySearchComponent implements OnInit {
  username: string = ''; 
  historyData: any[] = []; 

  constructor(private historyService: HistoryService) {}

  ngOnInit(): void {
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      this.username = storedUsername; 
    }
  }

  searchHistory() {
    if (this.username) {
      this.historyService.getHistoryByUsername(this.username).subscribe(
        (response) => {
          this.historyData = response.data;
        },
        (error) => {
          console.error('Error fetching history data', error);
        }
      );
    } else {
      this.historyData = [];
    }
  }
}