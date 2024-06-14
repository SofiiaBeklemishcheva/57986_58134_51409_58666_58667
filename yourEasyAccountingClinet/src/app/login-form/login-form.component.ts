import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/interfaces';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {
    this.signupForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    });
  }
  user!: User;
  userSub!: Subscription;
  signupForm: FormGroup;

  onSubmit() {
    this.auth.logIn(
      this.signupForm.get('username')?.value,
      this.signupForm.get('password')?.value
    );
    if (this.auth.getUser() !== null || undefined) {
      this.router.navigate(['home']);
    } else {
      alert('Logowanie nieudane, proszę sprawdzić hasło/login.');
    }
  }

  ngOnInit() {}
}
