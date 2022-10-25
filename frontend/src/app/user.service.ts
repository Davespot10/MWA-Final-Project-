import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppSettings } from 'src/appSettings';
import User from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public BACK_END = AppSettings.BASE_URL;

  //new
  public userState: BehaviorSubject<User> = new BehaviorSubject({
    _id: '',
    token: '',
    email: '',
    last_name: '',
    first_name: '',
    phone_number: '',
  });

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<{ success: boolean; data: string }>(
      this.BACK_END + 'login',
      { email, password }
    );
  }
  signup(
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    phone_number: string
  ) {
    return this.http.post(this.BACK_END + 'signup', {
      email,
      password,
      first_name,
      last_name,
      phone_number,
    });
  }
}
