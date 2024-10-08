import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, Subject, map } from 'rxjs';
import { environment } from '../environments/environment';
import { MessageXMPP } from './chat-main/work-area-bar/message-xmpp.model';
import { Contact } from './chat-main/contact-area-bar/contact-xmpp.model';
import { GroupRequest } from './chat-main/work-area-bar/GroupRequest.model';

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

  getContacts(): Observable<{ contacts: Contact[] }> {
    return this.http.get<{ contacts: Contact[] }>(`${this.apiUrl}/get-contacts`, { withCredentials: true });
  }

  addContact(username: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new HttpParams().set('username', username);

    return this.http.post<any>(`${this.apiUrl}/add-contact`, body.toString(), { headers, withCredentials: true });
  }
  
  createGroup(groupRequest: GroupRequest): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/create-group`, groupRequest, { headers, withCredentials: true });
  }

  // Nuevo método para obtener los grupos del usuario
  getGroups(): Observable<{ status: string, groups: GroupRequest[] }> {
    return this.http.get<{ status: string, groups: GroupRequest[] }>(`${this.apiUrl}/get-groups`, { withCredentials: true });
  }

  getGroupMessages(groupName: string): Observable<{ status: string, messages: MessageXMPP[] }> {
    const url = `${this.apiUrl}/get-messages-group`;
    const params = new HttpParams().set('groupName', groupName);
    return this.http.get<{ status: string, messages: MessageXMPP[] }>(url, { params, withCredentials: true });
  }

  getGetMessagesGroup(): Observable<MessageXMPP[]> {
    return this.http.get<MessageXMPP[]>(`${this.apiUrl}/messages`, { withCredentials: true });
  }

  // Método para enviar un mensaje grupal
  sendGroupMessage(groupName: string, body: string): Observable<any> {
    const url = `${this.apiUrl}/send-group-message`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
  
    const bodyContent = new HttpParams()
      .set('groupName', groupName)
      .set('body', body);
  
    console.log("bodyContent:", bodyContent.toString());
  
    return this.http.post<any>(url, bodyContent.toString(), { headers, withCredentials: true });
  }

  //Definir status & presence

  // Método para cambiar el estado de disponibilidad
  changeStatus(status: string): Observable<{ status: string }> {
    const url = `${this.apiUrl}/change-status`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    const bodyContent = new HttpParams().set('status', status);

    return this.http.post<{ status: string }>(url, bodyContent.toString(), { headers, withCredentials: true });
  }

  // Nuevo método para obtener el estado actual del usuario
  getCurrentStatus(): Observable<string> {
    return this.http.get<{ currentStatus: string }>(`${this.apiUrl}/get-current-status`, { withCredentials: true })
      .pipe(
        map(response => {
          // Mapea los estados personalizados a los estados estándar
          console.log("currentStatus: ", response.currentStatus);
          switch (response.currentStatus) {
            case "I'm busy":
              return 'busy';
            case "I'm away":
              return 'absent';
            case "I'm unavailable":
              return 'unavailable';
            case "I'm available":
            case "available":
                return 'available';
            default:
              return 'offline'; // Estado por defecto
          }
        })
      );
  }

  sendFile(to: string, base64File: string, fileName: string): Observable<any> {
    // Configurar los headers para el tipo de contenido
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    // Crear el cuerpo de la solicitud
    const body = new HttpParams()
      .set('to', to)
      .set('fileName', fileName)
      .set('base64File', base64File);

    // Enviar la solicitud POST al backend
    return this.http.post<any>(`${this.apiUrl}/send-file`, body.toString(), { headers, withCredentials: true });
  }

  sendNewFile(to: string, base64File: string, fileName: string): Observable<any> {
    // Configurar los headers para el tipo de contenido
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    // Crear el cuerpo de la solicitud
    const body = new HttpParams()
      .set('to', to)
      .set('fileName', fileName)
      .set('base64File', base64File);

    // Enviar la solicitud POST al backend
    return this.http.post<any>(`${this.apiUrl}/send-new-file`, body.toString(), { headers, withCredentials: true });
  }

}
