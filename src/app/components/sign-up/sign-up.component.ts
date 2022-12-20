import { Component } from '@angular/core';
import { Router } from '@angular/router';
import User from 'src/app/models/user.model';
import UserService from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  constructor(private userService: UserService, private router: Router) {}
  username = '';
  password = '';
  repeatedPassword = '';

  signUp() {
    if (this.username === '' || this.password === '') {
      return;
    }
    if (this.username.length < 4 || this.password.length < 2) {
      alert('Invalid username or password');
      return;
    }
    const user = new User(this.username, this.password, false);
    this.userService.isUsernameAvailable(this.username).then(
      (b) => {
        if (b) {
          this.userService.create(user).subscribe();
          alert('user created');
          this.router.navigate([`/`]);
        } else {
          alert(`username "${this.username}" already exists`);
        }
      }
      /* b
        ? (service = this.userService) => {
            service.create(user).subscribe();
            alert('user created');
            this.router.navigate([`/`]);
          }
        : alert(`username "${this.username}" already exists`) */
    );
  }
}
