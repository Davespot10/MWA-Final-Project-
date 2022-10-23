import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from './user.service';
import { Router } from "@angular/router";
import jwt_decode from "jwt-decode";



@Component({
  selector: 'app-login',
  template: `
    <mat-card>
      <mat-card-content>
        <form [formGroup]="loginForm" (ngSubmit)="login()" novalidate>
          <h2>Log In</h2>
          <mat-error *ngIf="!loginValid">
            {{loginErrText}}
          </mat-error>


          <mat-form-field>
            <input matInput placeholder="Email" name="email" formControlName="email" required>
            <mat-error>
              Please enter a valid email address.
            </mat-error>
          </mat-form-field>



          <mat-form-field>
            <input matInput type="password" placeholder="Password" name="password" formControlName="password" required>
            <mat-error>
              Minimum password length required is 6
            </mat-error>
          </mat-form-field>
          
          <button ty mat-raised-button color="primary" [disabled]="!loginForm.valid">Login</button>
        </form>
        <p>Don't have an account? <a [routerLink]="['/register']">Sign Up.</a></p>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      mat-card {
        max-width: 400px;
        margin: 2em auto;
        text-align: center;
      }

      mat-form-field {
        display: block;
      }
    `
  ]
})
export class LoginComponent implements OnInit {
  loginErrText: string = '';
  loginValid: boolean = true;
  loginForm!: FormGroup;
  

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.minLength(6), Validators.required]]
    });
  }

  ngOnInit(): void {
   
  }

  login() {
    this.userService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(response => {
        console.log(response);
        const token = jwt_decode(response.data) as {
          _id: string, token: string, email: string, last_name: string, first_name: string,phone_number:string
        };
        const state_object = ({
          _id: token._id,
          token: response.data,
          email: token.email,
          last_name: token.last_name,
          first_name: token.first_name,
          phone_number:token.phone_number

        })
        this.userService.userState.next(state_object)
        localStorage.setItem("APP_STATE", JSON.stringify(state_object));
        this.router.navigate([""])
      
      
      });

  }
}




// import {Component, OnInit} from '@angular/core';
// import {FormBuilder, FormGroup, Validators} from "@angular/forms";
// import {UserService} from './user.service';
// import {Router} from "@angular/router";

// @Component({
//   selector: 'app-login',
//   template: `
//     <mat-card>
//       <mat-card-content>
//         <form [formGroup]="loginForm" (ngSubmit)="login()" novalidate>
//           <h2>Log In</h2>
//           <mat-error *ngIf="!loginValid">
//             {{loginErrText}}
//           </mat-error>


//           <mat-form-field>
//             <input matInput placeholder="Email" name="email" formControlName="email" required>
//             <mat-error>
//               Please enter a valid email address.
//             </mat-error>
//           </mat-form-field>



//           <mat-form-field>
//             <input matInput type="password" placeholder="Password" name="password" formControlName="password" required>
//             <mat-error>
//               Minimum password length required is 6
//             </mat-error>
//           </mat-form-field>
          
//           <button ty mat-raised-button color="primary" [disabled]="!loginForm.valid">Login</button>
//         </form>
//         <p>Don't have an account? <a [routerLink]="['/register']">Sign Up.</a></p>
//       </mat-card-content>
//     </mat-card>
//   `,
//   styles: [
//     `
//       mat-card {
//         max-width: 400px;
//         margin: 2em auto;
//         text-align: center;
//       }

//       mat-form-field {
//         display: block;
//       }
//     `
//   ]
// })
// export class LoginComponent implements OnInit {
//   loginErrText: string = '';
//   loginValid: boolean = true;
//   loginForm!: FormGroup;
  

//   constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { 
//     this.loginForm = this.fb.group({
//       email: ['',Validators.required],
//       password: ['', [Validators.minLength(6), Validators.required]]
//     });
//   }

//   ngOnInit(): void {
   
//   }

//   login() {
//     this.userService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
//       next: (res: any) => {
//         console.log(res);
//           this.userService.userState.next(res);
//           this.userService.persistState();
//           this.loginValid = true;
//           this.router.navigate(['items']);
//         },
//         error: (err: any) => {
//           this.loginErrText = err.error.message as string;
//           this.loginValid = false;
//           console.log(err.error.message);
//         }
//       });
//   }

// }


