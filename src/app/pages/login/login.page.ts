import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { tap } from 'rxjs/operators';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css']
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private storageService: StorageService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.checkLoggedInUser();
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.maxLength(20)]]
    })
  }

  login() {
    this.authService.login(this.loginForm.get('username').value, this.loginForm.get('password').value)
      .pipe(
        tap((response: any) => {
          console.log(response)
          this.storageService.setItem('user', JSON.stringify(response));
          this.loginForm.reset();
          this.router.navigate([''])
          window.location.reload();
        })
      ).subscribe(_ => console.log(), error => {
      this.loginForm.reset()
    })
  }

  checkLoggedInUser() {
    let userToken = this.storageService.getItem('user');
    if(userToken) {
      this.router.navigate(['/'])
    }
  }

  logout() {
    this.storageService.removeItem('user');
  }
}
