import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import  User from './user.interface';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public BACKEND = "http://localhost:3000/"
  
  //new
  public userState: BehaviorSubject<User> = new BehaviorSubject({
    _id: "",
    token: "",
    email: "",
    last_name: "",
    first_name: "",
    phone_number:""
    
  })


  //old
  // public userState = new BehaviorSubject<{ token: string }>({token: ''});

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<{success:boolean,data:string}>(this.BACKEND + 'login', { email, password });
    
  }
  signup(email: string, password: string, first_name: string,last_name:string, phone_number: string) {
    return this.http.post(this.BACKEND + 'signup', {email, password, first_name,last_name, phone_number});
  }


  persistState(){
    localStorage.setItem('userState', JSON.stringify(this.userState.value));
  }

}


// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { User } from './user.interface';
// import jwt_decode from "jwt-decode";

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//   public BACKEND = "http://localhost:3000/"
  
//   //new
//   public userState: BehaviorSubject<{_id: string, token: string,first_name:string,last_name:string,email:string }> = new BehaviorSubject({
//     _id: "",
//     token: "",
//     email: "",
//     last_name: "",
//     first_name:""
    
//   })


//   //old
//   // public userState = new BehaviorSubject<{ token: string }>({token: ''});

//   constructor(private http: HttpClient) { }

//   login(email: string, password: string) {
//     return this.http.post<{success:boolean,data:string}>(this.BACKEND + 'login', { email, password });
    
//   }
//   signup(email: string, password: string, first_name: string,last_name:string, phone_number: string) {
//     return this.http.post(this.BACKEND + 'signup', {email, password, first_name,last_name, phone_number});
//   }

//   getUserState(): User | null {
//     const decoded = this.userState.value.token && jwt_decode(this.userState.value.token) as User;
//     return decoded || null;
//   }

//   persistState(){
//     localStorage.setItem('userState', JSON.stringify(this.userState.value));
//   }
  

//   refreshState(){
//     const userState = localStorage.getItem('userState');
//     if(userState){
//       this.userState.next(JSON.parse(userState));
//     }
//   }

//   logout() {
//     this.userState.next({  _id: "",
//     token: "",
//     email: "",
//     last_name: "",
//     first_name:""});//new
//     localStorage.removeItem('userState');
//   }

// }

