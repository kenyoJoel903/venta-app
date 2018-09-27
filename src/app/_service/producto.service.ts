import { HttpClient } from '@angular/common/http';
import { Producto } from './../_model/producto';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HOST } from '../_shared/var.constant';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  productoCambio = new Subject<Array<Producto>>();
  mensajeCambio = new Subject<string>();

  url:string = `${HOST}/productos`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Array<Producto>>(`${this.url}`);
  }


  listarPageable(nroPagina:number, tamanioPagina:number){
    return this.http.get<Array<Producto>>(`${this.url}/pageable?page=${nroPagina}&size=${tamanioPagina}`);
  }

  registrar(producto:Producto){
    return this.http.post(`${this.url}`, producto);
  }

  modificar(producto:Producto){
    return this.http.put<Producto>(`${this.url}`, producto);
  }

  listarPorId(id:number){
    return this.http.get<Producto>(`${this.url}/${id}`);
  }

  eliminar(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
}
