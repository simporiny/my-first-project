

import { Component, OnInit } from '@angular/core';
import { PackageService } from '../package.service';
import { StudentService } from '../studen.service';
import { HistoryService } from '../history.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  standalone: true,
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class BookingComponent implements OnInit {
  packages: any[] = [];
  students: any[] = [];
  selectedPackageId: number | undefined;
  enteredStudentName: string = '';
  isStudentFound: boolean | null = null;
  foundStudent: any | null = null;
  selectedPackage: any | null = null;

  constructor(
    private packageService: PackageService,
    private studentService: StudentService,
    private historyService: HistoryService
  ) {}

  ngOnInit(): void {
    this.loadPackages(); 
    this.loadStudents(); 
  
    // ดึง username จาก sessionStorage
    const savedUsername = sessionStorage.getItem('username');
    if (savedUsername) {
      this.enteredStudentName = savedUsername;
      this.checkStudentName();
    }
  }

  loadPackages(): void {
    this.packageService.getPackages().subscribe(
      (response) => {
        if (response.status) {
          this.packages = response.data;
          console.log('Packages:', this.packages);
        } else {
          console.error('Error fetching packages');
        }
      },
      (error) => {
        console.error('Error fetching packages', error);
      }
    );
  }
  
  loadStudents(): void {
    this.studentService.getStudents().subscribe(
      (response) => {
        if (response.status) {
          this.students = response.data;
        } else {
          console.error('Error fetching students');
        }
      },
      (error) => {
        console.error('Error fetching students', error);
      }
    );
  }

  checkStudentName(): void {
    const found = this.students.find(
      (student) =>
        student.stname.toLowerCase() === this.enteredStudentName.toLowerCase()
    );
    if (found) {
      this.isStudentFound = true;
      this.foundStudent = found; 
    } else {
      this.isStudentFound = false;
      this.foundStudent = null; 
    }
  }

  onPackageSelect(): void {
    this.selectedPackage = this.packages.find(
      (pkg) => pkg.package_id === Number(this.selectedPackageId) 
    );
  }
  
  onSubmit(): void {
    if (this.foundStudent && this.selectedPackage) {
      const st_id = this.foundStudent.id;  
      const p_id = this.selectedPackage.package_id;
  
      this.historyService.addHistory(st_id, p_id).subscribe(
        (response) => {
          if (response.status) {
            console.log('History record added successfully');
            alert('Booking Successful');
            
            this.updatePackageLeft(p_id);
            window.location.reload();
          } else {
            console.error('Error adding history');
          }
        },
        (error) => {
          console.error('Error adding history', error);
        }
      );
    } else {
      console.error('Student or Package not selected');
    }
  }
  
  updatePackageLeft(packageId: number): void {
    const decrementValue = 1; 
  
    this.packageService.updatePackageLeft(packageId, decrementValue).subscribe(
      (response) => {
        if (response.status) {
          console.log('Package left updated successfully');
        } else {
          console.error('Error updating package left');
        }
      },
      (error) => {
        console.error('Error updating package left', error);
      }
    );
  }
}
