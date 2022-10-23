import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StepperOrientation} from '@angular/material/stepper';
import {map, Observable} from "rxjs";
import {BreakpointObserver} from "@angular/cdk/layout";
import {UserService} from './user.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  template: `
  
    <mat-card>

    <form [formGroup]="loginForm" (ngSubmit)="signup()" novalidate>
            <mat-form-field appearance="fill">
              <mat-label>Email</mat-label>
              <input matInput placeholder="Eg. dave@gmail.com " formControlName="email" required>
              <mat-error>
                Please enter a valid email address.
              </mat-error>
            </mat-form-field>
           
        


            <mat-form-field appearance="fill">
              <mat-label>Password</mat-label>
              <input matInput [type]="hide ? 'password' : 'text'" formControlName="password" placeholder="Your password here" required>
              <button mat-icon-button matSuffix (click)="hide = !hide" [attr.aria-label]="'Hide password'" [attr.aria-pressed]="hide">
                <mat-icon>{{hide ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-error>
                Please Enter Your Password
              </mat-error>
            </mat-form-field>
            


        
            <mat-form-field appearance="fill">
              <mat-label>First_Name</mat-label>
              <input matInput placeholder="Ex. Belay" formControlName="first_name" required>
              <mat-error>
                First_Name is required.
              </mat-error>
            </mat-form-field>
           
  


            <ng-template matStepLabel>Fill Your Last Name</ng-template>
            <mat-form-field appearance="fill">
              <mat-label>Last_Name</mat-label>
              <input matInput placeholder="Ex. Hasib" formControlName="last_name" required>
              <mat-error>
                Last_Name is required.
              </mat-error>
            </mat-form-field>
           
  

            <ng-template matStepLabel>Fill out your phone number</ng-template>
            <mat-form-field appearance="fill">
              <mat-label>Phone Number</mat-label>
              <span matPrefix>+1 &nbsp;</span>
              <input type="tel" matInput placeholder="641 ..." formControlName="phone_number">
              <mat-error>
                Phone_Number is required.
              </mat-error>
            </mat-form-field>
            
       
    
          
          <div>
          
            <button [disabled]="!loginForm.valid" mat-raised-button color="primary" (click)="signup()" >Create Account</button>
          </div>
        </form>
  
    </mat-card>
    
  `,
  styles: [
    `
      mat-card {
        margin: 2em 1em;
        text-align: center;
      }

      mat-form-field {
        display: block;
        width: 50%;
        margin: 20px auto;
      }

      .spacer {
        margin: 10px;
      }
    `
  ]
})
export class RegisterComponent  {
  


 

  hide = true;
  loginValid: boolean = true;
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone_number: ['', Validators.required],
    });
  }



  constructor(private fb: FormBuilder, breakpointObserver: BreakpointObserver, private userService: UserService,
               private router: Router) {
 
  }



  signup() {
    this.userService.signup(this.loginForm.value.email as string, this.loginForm.value.password as string,
      this.loginForm.value.first_name as string, this.loginForm.value.last_name as string,this.loginForm.value.phone_number as string).subscribe({
        next: (res: any) => {
          
        this.userService.userState.next(res);
        this.userService.persistState();
        this.router.navigate(['login']);
      }
    });
  }

}



