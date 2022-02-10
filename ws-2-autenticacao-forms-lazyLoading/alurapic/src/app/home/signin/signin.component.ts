import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Component({
  templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit{

  loginForm: FormGroup = new FormGroup({});
  @ViewChild('userNameInput') userNameInput!: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private platformDetectorService: PlatformDetectorService
  ) {
    this.loginForm = new FormGroup({
      userName: new FormControl(''),
      password: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  validateInputForm(name: string): boolean {
    const nameHasError = this.loginForm.get(name)?.hasError('required')
    if (nameHasError) { return nameHasError} else { return false }
  }

  login() {
    const userName = this.loginForm.get('userName')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authService
      .authenticate(userName, password)
      .subscribe(
        ()=> {
          console.log('autenticado');
          this.router.navigate([
            'user',
            userName
          ]);
        },
        err => {
          console.log('error:',err);
          this.loginForm.reset();
          this.platformDetectorService.isPlatformBrowser() && this.userNameInput.nativeElement.focus();
          alert('Invalid user name or password');
        }
      );
  }

}