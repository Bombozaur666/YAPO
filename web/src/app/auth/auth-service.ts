import {Injectable} from '@angular/core';
import {LoginRequest, RegisterRequest, User, UsernameRequest} from '../Interfaces/Users/user';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of, tap} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {JWT_TOKEN, REFRESH_TOKEN, TokenResponse} from '../Interfaces/Users/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated: boolean = false;
  protected baseUrl: string = 'http://localhost:8080/user/';

  constructor(private httpClient: HttpClient,
              private cookieService: CookieService,
              private router: Router) {}

  get token(): string | null {
    return this.cookieService.get(JWT_TOKEN);
  }

  get path(): string {
    return this.baseUrl + "avatar";
  }

  get isAuthenticated(): boolean {
    return this.authenticated;
  }

  userProfile(): Observable<User> {
    return this.httpClient.get<User>(this.baseUrl);
  }

  login(loginRequest: LoginRequest): void{
    this.httpClient.post<TokenResponse>(this.baseUrl + 'login', loginRequest, {
      headers: {'Content-Type': 'application/json'},
      withCredentials: true
    }
    ).subscribe({
      next: (data: TokenResponse): void => {
        this.cookieService.set(JWT_TOKEN ,data.accessToken);
        this.cookieService.set(REFRESH_TOKEN ,data.refreshToken);
        this.authenticated = true;
        this.router.navigate(['/']);
      },
      error: (err: any): void => {
        alert(`Błąd logowania: ${err.status} - ${err.error}`);
      }
    });
  }

  logout(): void {
    this.cookieService.delete(JWT_TOKEN);
    this.cookieService.delete(REFRESH_TOKEN);
    this.authenticated = false;

    this.router.navigate(['/login']);
  }


  profile(): Observable<Object> {
    return this.httpClient.get(this.baseUrl);
  }

  register(registerRequest: RegisterRequest):Observable<User> {
    return  this.httpClient.post<User>(this.baseUrl + 'register', registerRequest);
  }

  refresh():  Observable<TokenResponse | null>  {
    const refreshToken: string = this.cookieService.get(REFRESH_TOKEN);
    if (!refreshToken) return of(null);

    return this.httpClient
      .post<TokenResponse>(this.baseUrl + "refresh", { refreshToken })
      .pipe(
        tap((data: TokenResponse): void => {
          this.cookieService.set(JWT_TOKEN, data.accessToken, { path: '/' });
          this.cookieService.set(REFRESH_TOKEN, data.refreshToken, { path: '/' });
        }),
        map((data: TokenResponse): TokenResponse => data),
        catchError( (): Observable<null> => {
          return of(null);
        }
      ));
  }

  avatarUpload(file: File): Observable<User> {
    const form = new FormData();
    form.append('file', file);
    return this.httpClient.post<User>(this.path, form);
  }

  forgotPassword(forgotRequest: UsernameRequest): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}forgot-password`, forgotRequest);
  }
}

