import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../shared/interfaces';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {
    this.userSub = auth.user.subscribe((user) => {
      this.user = user;
    });
  }
  userSub: Subscription;
  user: User | null | undefined;

  logOut() {
    this.auth.logOut();
    this.router.navigate(['login']);
  }

  ngOnInit() {
    this.auth.autoLogOn();
  }
}
