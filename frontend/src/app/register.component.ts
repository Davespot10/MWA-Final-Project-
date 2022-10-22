import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  template: `
    <form [formGroup]="userInfoFormGroup"class="emailPass">
  <ng-template matStepLabel>User Information </ng-template>
  <mat-form-field appearance="fill" class="field">
    <mat-label>First Name </mat-label>
    <input matInput placeholder="Ex. Dawit" formControlName="firstName" required>
  </mat-form-field>
  <mat-form-field appearance="fill" class="field">
    <mat-label>Last Name </mat-label>
    <input matInput placeholder="Ex. Demelash" formControlName="lastName" required>
  </mat-form-field>
  <mat-form-field appearance="fill" class="field">
    <mat-label>Email</mat-label>
    <input matInput placeholder="Ex. davespot@gmail.com" formControlName="email" required>
  </mat-form-field>
  <mat-form-field appearance="fill" class="field">
    <mat-label>Phone</mat-label>
    <input matInput placeholder="Ex. 4657896" formControlName="phone">
  </mat-form-field>
</form>
<div class="submit">
  <button *ngIf="!submit" mat-raised-button (click)="register()" color="accent" class="stepper-btn">Register</button>
  <mat-progress-bar mode="indeterminate" *ngIf="submit"></mat-progress-bar>
</div>
  `,
  styles: [
    `
      .submit{
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
  display: grid;
  justify-content: center;
  margin-top: 100px;
  margin-right: 13rem;
}

.field{
  width: 200%;
}
    `,
  ],
})
export class RegisterComponent implements OnInit {
  submit = false;
  userInfoFormGroup = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required]],
    phone: [''],
  });

  register() {}

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
}
