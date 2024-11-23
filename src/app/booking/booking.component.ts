

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
  packages: any[] = []; // Store package data
  students: any[] = []; // Store student data
  selectedPackageId: number | undefined; // Store selected package ID
  enteredStudentName: string = ''; // Store the entered student name
  isStudentFound: boolean | null = null; // Flag to indicate if the student name is found
  foundStudent: any | null = null; // Store the found student details
  selectedPackage: any | null = null;

  constructor(
    private packageService: PackageService,
    private studentService: StudentService,
    private historyService: HistoryService
  ) {}

  ngOnInit(): void {
    this.loadPackages(); // ดึงข้อมูล packages
    this.loadStudents(); // ดึงข้อมูล students
  
    // ดึง username จาก sessionStorage
    const savedUsername = sessionStorage.getItem('username');
    if (savedUsername) {
      this.enteredStudentName = savedUsername; // ตั้งค่า username ให้กับช่องกรอกชื่อ
      this.checkStudentName(); // ตรวจสอบว่ามี student หรือไม่
    }
  }
  
  

  // Method to load packages from the service
  loadPackages(): void {
    this.packageService.getPackages().subscribe(
      (response) => {
        if (response.status) {
          this.packages = response.data; // Set the package data
          console.log('Packages:', this.packages); // Debugging
        } else {
          console.error('Error fetching packages');
        }
      },
      (error) => {
        console.error('Error fetching packages', error);
      }
    );
  }
  

  // Method to load students from the service
  loadStudents(): void {
    this.studentService.getStudents().subscribe(
      (response) => {
        if (response.status) {
          this.students = response.data; // Set the student data
        } else {
          console.error('Error fetching students');
        }
      },
      (error) => {
        console.error('Error fetching students', error);
      }
    );
  }

  // Method to check if the entered student name exists
  checkStudentName(): void {
    const found = this.students.find(
      (student) =>
        student.stname.toLowerCase() === this.enteredStudentName.toLowerCase()
    );
    if (found) {
      this.isStudentFound = true;
      this.foundStudent = found; // Store the found student data
    } else {
      this.isStudentFound = false;
      this.foundStudent = null; // Clear the student data if not found
    }
  }

  onPackageSelect(): void {
    this.selectedPackage = this.packages.find(
      (pkg) => pkg.package_id === Number(this.selectedPackageId) // Ensuring type consistency
    );
  }
  
  onSubmit(): void {
    if (this.foundStudent && this.selectedPackage) {
      const st_id = this.foundStudent.id;  // Assuming 'id' is the student ID in your student table
      const p_id = this.selectedPackage.package_id; // Package ID

      // Call the history service to insert the data
      this.historyService.addHistory(st_id, p_id).subscribe(
        (response) => {
          if (response.status) {
            console.log('History record added successfully');
            alert('Booking Successful');
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
}
