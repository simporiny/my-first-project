import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../history.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class HistoryComponent implements OnInit {
  historyData: any[] = [];

  constructor(private historyService: HistoryService) {}

  ngOnInit(): void {
    this.historyService.getHistory().subscribe(response => {
      if (response.status) {
        this.historyData = response.data;
      } else {
        console.error('Failed to fetch history data');
      }
    });
  }
}
