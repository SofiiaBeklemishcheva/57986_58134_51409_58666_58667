import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent implements OnInit {
  constructor(private auth: AuthService) {
    this.signupForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    });
  }
  signupForm: FormGroup;

  onSubmit() {
    this.auth.logIn('test', 'hehe');
  }

  ngOnInit() {}
}
