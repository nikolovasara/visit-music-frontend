import {Component, OnInit} from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {StorageService} from "../../services/storage.service";
import {Router} from "@angular/router";
import {tap} from "rxjs/operators";
import {NotifierService} from "angular-notifier";

@Component({
  templateUrl:'register.page.html',
  styleUrls:['register.page.css']
})
export class RegisterPage implements OnInit{
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private notifierService: NotifierService,
              private router: Router) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(8)]],
      confirmPassword: [''],
      role: [{value:'User', disabled: true}, Validators.required]
    }, {validators: this.checkPasswords})
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value
    return pass === confirmPass ? null : { notSame: true }
  }

  register(){
    if(this.registerForm.get('password').value != this.registerForm.get('confirmPassword').value)
    this.notifierService.notify('error',"Passwords do not match.")

    if(this.registerForm.valid){
      console.log("SUCCESSFULLY REGISTERED")
      this.authService.register({username: this.registerForm.get('username').value, password: this.registerForm.get('password').value, "role":"ROLE_USER"})
        .pipe(
          tap((response: any) => {
            console.log(response)
            this.registerForm.reset();
            this.notifierService.notify('success',"User successfully created.")
            //this.router.navigate([''])
            //window.location.reload();
          })
        ).subscribe(_ => console.log(), error => {
        this.notifierService.notify('error',"Username already exists.")
      })
    }
  }
}
