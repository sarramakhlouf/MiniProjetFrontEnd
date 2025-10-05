import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User.model';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /*users: User[] = [{ "username": "admin", "password": "123", "roles": ['ADMIN'] },
  { "username": "sarra", "password": "123", "roles": ['USER'] }];*/
  private helper = new JwtHelperService();
  public regitredUser: User = new User();
  public loggedUser!: string;
  public isloggedIn: Boolean = false;
  public roles!: string[];
  apiURL: string = 'http://localhost:8081/users';
  token!: string;

  constructor(private router: Router, private http: HttpClient) {
  }

  login(user: User) {
    return this.http.post<User>(this.apiURL + '/login', user, { observe: 'response' });
  }
  saveToken(jwt: string) {
    console.log("Token reçu :", jwt);
    if (jwt.startsWith('Bearer ')) {
      jwt = jwt.slice(7);
    }
    localStorage.setItem('jwt', jwt);
    this.token = jwt;
    this.isloggedIn = true;
    this.decodeJWT();
  }

  decodeJWT() {
    if (this.token == undefined)
      return;
    const decodedToken = this.helper.decodeToken(this.token);
    this.roles = decodedToken.roles;
    this.loggedUser = decodedToken.sub;
  }


  loadToken(): void {
    this.token = localStorage.getItem('jwt') || '';
  }

  getToken(): string {
    console.log("Token récupéré :", this.token);
    return this.token;
  }

  logout() {
    this.loggedUser = undefined!;
    this.roles = undefined!;
    this.token = undefined!;
    this.isloggedIn = false;
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

  /*SignIn(user: User): Boolean {
     let validUser: Boolean = false;
     this.users.forEach((curUser) => {
       if (user.username == curUser.username && user.password == curUser.password) {
         validUser = true;
         this.loggedUser = curUser.username;
         this.isloggedIn = true;
         this.roles = curUser.roles;
         localStorage.setItem('loggedUser', this.loggedUser);
         localStorage.setItem('isloggedIn', String(this.isloggedIn));
       }
     });
     return validUser;
   }*/

  isAdmin(): Boolean {
    if (!this.roles)
      return false;
    return this.roles.indexOf('ADMIN') >= 0;
  }

  setLoggedUserFromLocalStorage(login: string) {
    this.loggedUser = login;
    this.isloggedIn = true;
    // this.getUserRoles(login);
  }

  isTokenExpired(): Boolean {
    return this.helper.isTokenExpired(this.token);
  }

  registerUser(user: User) {
    return this.http.post<User>(this.apiURL + '/register', user, { observe: 'response' });
  }

  setRegistredUser(user: User) {
    this.regitredUser = user;
  }

  getRegistredUser() {
    return this.regitredUser;
  }

  validateEmail(code: string) {
    return this.http.get<User>(this.apiURL + '/verifyEmail/' + code);
  }


  /*getUserRoles(username: string) {
    this.users.forEach((curUser) => {
      if (curUser.username == username) {
        this.roles = curUser.roles;
      }
    });
  }*/

  // auth.service.ts
  sendEmail(to: string, subject: string, body: string) {
    return this.http.post(`${this.apiURL}/send-email`,
      { to, subject, body },
      { headers: { 'Content-Type': 'application/json' } }
    );
  }


}