import { Component } from '@angular/core';
import { HistoryService } from '../history.service'; // Assuming you have a service for history fetching
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-history-search',
  standalone: false,
  templateUrl: './history-search.component.html',
  styleUrls: ['./history-search.component.scss'],
  // imports: [CommonModule, FormsModule]
})
export class HistorySearchComponent {
  username: string = ''; // Store the username
  historyData: any[] = []; // Store the history data

  constructor(private historyService: HistoryService) {}

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
      this.historyData = []; // Clear data if no username is entered
    }
  }
}