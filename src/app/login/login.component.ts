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
  showRegisterForm: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {}

  login() {
    this.loginService.login(this.username, this.password).subscribe(
      (response) => {
        if (response.status) {
          sessionStorage.setItem('username', this.username);
  
          if (this.username === 'admin') {
            this.router.navigate(['/user']); 
          } else {
            this.router.navigate(['/booking']); 
          }
        }
      },
      (error) => {
        this.errorMessage = 'Invalid username or password';
      }
    );
  }

  register() {
    if (this.newPassword !== this.reConfirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }
  
    // if (!this.phone || !this.email) {
    //   this.errorMessage = 'Please fill in both phone and email fields.';
    //   return;
    // }
  
    // const phonePattern = /^[0-9]{10}$/; 
    // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  
    // if (!phonePattern.test(this.phone)) {
    //   this.errorMessage = 'Please enter a valid phone number (10 digits).';
    //   return;
    // }
  
    // if (!emailPattern.test(this.email)) {
    //   this.errorMessage = 'Please enter a valid email address.';
    //   return;
    // }

    const studentData = {
      stname: this.newUsername,  
      pwd: this.newPassword,    
      course: this.phone,      
      fee: this.email            
    };
  
    this.loginService.registerStudent(studentData).subscribe(
      (response: { status: any; message: string | null; }) => {
        if (response.status) {
          console.log('Registration successful');
          this.showRegisterForm = false;
          this.errorMessage = null;
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