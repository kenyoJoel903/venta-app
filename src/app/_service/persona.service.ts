import { HttpClient } from '@angular/common/http';
import { HOST } from '../_shared/var.constant';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Persona } from '../_model/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  personaCambio = new Subject<Array<Persona>>();
  mensajeCambio = new Subject<string>();

  url:string = `${HOST}/personas`;

  constructor(private http: HttpClient) { }


  listar(){
    return this.http.get<Array<Persona>>(`${this.url}`);
  }

  listarPageable(nroPagina:number, tamanioPagina:number){
    return this.http.get<Array<Persona>>(`${this.url}/pageable?page=${nroPagina}&size=${tamanioPagina}`);
  }

  registrar(persona:Persona){
    return this.http.post(`${this.url}`, persona);
  }

  modificar(persona:Persona){
    return this.http.put<Persona>(`${this.url}`, persona);
  }

  listarPorId(id:number){
    return this.http.get<Persona>(`${this.url}/${id}`);
  }

  eliminar(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
}
