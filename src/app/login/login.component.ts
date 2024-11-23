import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  newUsername: string = '';
  newPassword: string = '';
  reConfirmPassword: string = '';
  phone: string = '';
  email: string = '';
  errorMessage: string | null = null;
  showRegisterForm: boolean = false; // To control showing register form

  constructor(private loginService: LoginService, private router: Router) {}

  login() {
    this.loginService.login(this.username, this.password).subscribe(
      (response) => {
        if (response.status) {
          // Check if the user is an admin
          if (this.username === 'admin') {
            this.router.navigate(['/user']);  // Navigate to /user if the user is admin
          } else {
            this.router.navigate(['/booking']);  // Otherwise, navigate to /booking
          }
        }
      },
      (error) => {
        this.errorMessage = 'Invalid username or password';
      }
    );
  }
  

  // Register function to validate and submit the registration
  register() {
    if (this.newPassword !== this.reConfirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }
  
    if (!this.phone || !this.email) {
      this.errorMessage = 'Please fill in both phone and email fields.';
      return;
    }
  
    const phonePattern = /^[0-9]{10}$/;  // Basic phone validation (10 digits)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Basic email validation
  
    if (!phonePattern.test(this.phone)) {
      this.errorMessage = 'Please enter a valid phone number (10 digits).';
      return;
    }
  
    if (!emailPattern.test(this.email)) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }
  
    // Call the API to register the user
    const studentData = {
      stname: this.newUsername,  // Map to stname
      pwd: this.newPassword,     // Map to pwd
      course: this.phone,        // Map to course
      fee: this.email            // Map to fee
    };
  
    this.loginService.registerStudent(studentData).subscribe(
      (response: { status: any; message: string | null; }) => {
        if (response.status) {
          console.log('Registration successful');
          this.showRegisterForm = false; // Hide register form after successful registration
          this.errorMessage = null; // Reset error message
        } else {
          this.errorMessage = response.message;
        }
      },
      () => {
        this.errorMessage = 'Registration failed, please try again.';
      }
    );
  }
}