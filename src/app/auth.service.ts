import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, Subject } from 'rxjs';
import { environment } from '../environments/environment';
import { MessageXMPP } from './chat-main/work-area-bar/message-xmpp.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  private usernameSubject = new BehaviorSubject<string | null>(null);
  username$ = this.usernameSubject.asObservable();
  private messageSelectedSubject = new Subject<string>();
  messageSelected$ = this.messageSelectedSubject.asObservable();

  constructor(private http: HttpClient) {}

  
  login(username: string, password: string): Observable<any> {
    //console.log('usuario: ', username);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.post<any>(`${this.apiUrl}/connect`, body.toString(), { 
        headers,
        withCredentials: true  // Incluye las credenciales (cookies) en la solicitud
    }).pipe(tap(() => this.usernameSubject.next(username)));
  }


  register(username: string, password: string): Observable<any> {
    console.log('Registrando usuario: ', username);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.post(`${this.apiUrl}/register`, body.toString(), { headers });
  }

  disconnect(username: string): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();
    body.set('username', username);

    console.log('Disconnect request URL:', `${this.apiUrl}/disconnect`);
    console.log('Disconnect request body:', body.toString());
    console.log('Disconnect request headers:', headers);

    return this.http.post<any>(`${this.apiUrl}/disconnect`, body.toString(), { headers, withCredentials: true });
  }

  deleteUser(username: string): Observable<any> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
      const body = new URLSearchParams();
      body.set('username', username);

      return this.http.post<any>(`${this.apiUrl}/delete-user`, body.toString(), { headers, withCredentials: true });
  }


  getUsername(): Observable<string | null> {
    return this.username$;
  }

  getMessages(): Observable<{ messages: MessageXMPP[]}> {
    return this.http.get<{messages: MessageXMPP[]}>(`${this.apiUrl}/get-messages`, { withCredentials: true });
  }

  sendMessage(to: string, body: string): Observable<any> {
    console.log("To (sendMessage) ", to);
    console.log("body(sendMessage) ", body);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const params = new HttpParams()
      .set('to', to)
      .set('body', body);

    return this.http.post<any>(`${this.apiUrl}/send-message`, params.toString(), { headers, withCredentials: true });
  }

  selectMessage(contactName: string): void {
    this.messageSelectedSubject.next(contactName);
  }

  getMessagesBySender(senderUsername: string): Observable<{ messages: MessageXMPP[] }> {
    const url = `${this.apiUrl}/get-messages-user?senderUsername=${encodeURIComponent(senderUsername)}`;
    return this.http.get<{ messages: MessageXMPP[] }>(url, { withCredentials: true });
  }

}
