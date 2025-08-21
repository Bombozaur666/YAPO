import { Injectable} from '@angular/core';
import {JWT_TOKEN, LoginRequest, REFRESH_TOKEN, RegisterRequest, TokenResponse, User} from '../Interfaces/Users/user';
import {HttpClient} from '@angular/common/http';
import {map, Observable, of, tap} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  protected user!: User;
  protected baseUrl: string = 'http://localhost:8080/user/';
  constructor(private httpClient: HttpClient,
              private cookieService: CookieService,
              private router: Router) {}

  get token(): string | null {
    return this.cookieService.get(JWT_TOKEN);
  }

  get userProfile(): User {
    this.httpClient.get<User>(this.baseUrl).subscribe({
        next: data => {this.user = data;},
        error: err => {console.log(err.message);}
      }
    )
    return this.user;
  }

  login(loginRequest: LoginRequest): void{
    this.httpClient.post<TokenResponse>(this.baseUrl + 'login', loginRequest, {
      headers: {
        'Content-Type': 'application/json'
      }}
    ).subscribe({
      next: (data) => {
        this.cookieService.set(JWT_TOKEN,data.token);
        this.router.navigate(['/user/']);
      },
      error: (err) => {
        console.log(err.message);
      }
    });
  }

  logout(): void {
    this.cookieService.delete(JWT_TOKEN);
    this.cookieService.delete(REFRESH_TOKEN);

    this.user = {} as User;
    this.router.navigate(['/login']);
  }


  profile(): Observable<Object> {
    return this.httpClient.get(this.baseUrl);
  }

  register(registerRequest: RegisterRequest):Observable<Object> {
    return  this.httpClient.post(this.baseUrl + 'register', registerRequest);
  }

  refresh(): Observable<string | null> {
    const refreshToken = this.cookieService.get(REFRESH_TOKEN);
    if (!refreshToken) return of(null);

    return this.httpClient
      .post<TokenResponse>(this.baseUrl + "refresh", { refreshToken })
      .pipe(
        tap((res) => this.cookieService.set('accessToken', res.token, { path: '/' })),
        map((res) => res.token)
      );
  }
}
