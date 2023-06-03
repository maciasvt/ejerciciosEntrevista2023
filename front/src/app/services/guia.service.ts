import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { catchError } from "rxjs/operators";
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Reservacion } from '../models/reservacion';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class GuiaService {

  constructor(private http:HttpClient) { }

  apiUrl:string = "https://localhost:44389";

  getGuia1(guia:string):Observable<any>
  {  
    return this.http.get(`${this.apiUrl}/api/guia/${guia}`).pipe(catchError((error)=> 
    throwError(Response.error)));
  }

  getReservacion(sala: string, fecha:string)
  {
    return this.http.get(`${this.apiUrl}/api/reservacion/${sala}/${fecha}`).pipe(catchError((error)=> 
    throwError(Response.error)));
  }

  addReservacion(reservacion:Reservacion):Observable<Reservacion>
  {
    return this.http.post<Reservacion>(`${this.apiUrl}/api/reservacion/`, reservacion);
  }


  postLogin(usuario:Usuario):Observable<Usuario>
  {
    return this.http.post<Usuario>(`${this.apiUrl}/api/login/`, usuario);
  }


  postSignup(usuario:Usuario):Observable<Usuario>
  {
    return this.http.post<Usuario>(`${this.apiUrl}/api/signup/`, usuario);
  }
}