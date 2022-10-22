import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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
