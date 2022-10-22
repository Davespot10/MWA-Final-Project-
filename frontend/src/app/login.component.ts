import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  template: `<div class="emailPass">
  <form [formGroup]="userInfoFormGroup">
      <!-- <ng-template matStepLabel>User Information </ng-template> -->
      <mat-form-field appearance="fill" class="field">
          <mat-label>Email</mat-label>
          <input matInput placeholder="Ex. John" formControlName="email" required>
      </mat-form-field>
      <mat-form-field appearance="fill" class="field">
          <mat-label>Password</mat-label>
          <input matInput placeholder="Ex. Doe" formControlName="password" required>
      </mat-form-field>
  </form>

</div>
<div class="submit">
  <button *ngIf="!submit" mat-raised-button (click)="Login()" color="accent" class="stepper-btn">Login</button>
  <mat-progress-bar mode="indeterminate" *ngIf="submit"></mat-progress-bar>

</div>`,
  styles: [` .submit{
    display:flex;
    justify-content: center;
    width: 100%;

  }
  .stepper-btn{
    padding: 0 6px 0 6px;
      margin: 6px 8px 6px 8px;
      min-width: 130px;
      min-height: 40px;
      border-radius: 0px;
      font-size: 16px;
      text-align: center;
      text-transform: uppercase;
      text-decoration:none;
      border: none;
      outline: none;
      background-color: green;
  }
  .emailPass{
    display: flex;
    justify-content: center;
    margin-top: 100px;
  }

  .field{
    width: 100%;
  }`],
})
export class LoginComponent implements OnInit {


  submit=false;
  userInfoFormGroup = this.fb.group({
    password: ['', [Validators.required]],
    email: ['', [Validators.required]],
  });
  Login() {

  }

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
  }


}
