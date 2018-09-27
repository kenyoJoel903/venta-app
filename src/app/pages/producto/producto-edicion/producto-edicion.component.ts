import { ActivatedRoute, Router, Params } from '@angular/router';
import { Producto } from './../../../_model/producto';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../_service/producto.service';

@Component({
  selector: 'app-producto-edicion',
  templateUrl: './producto-edicion.component.html',
  styleUrls: ['./producto-edicion.component.css']
})
export class ProductoEdicionComponent implements OnInit {

  id:number;
  form:FormGroup;
  edicion:boolean = false;
  producto:Producto;

  constructor(private route: ActivatedRoute, private router: Router,
    private productoService:ProductoService) {

      this.form = new FormGroup({
        'id' : new FormControl(0),
        'marca': new FormControl(''),
        'nombre': new FormControl(''),
        'precio': new FormControl(0)
      });
  }

  ngOnInit() {
    this.producto = {
      idProducto:0,
      marca:'',
      nombre:'',
      precio:0
    };
    this.route.params.subscribe((params:Params)=>{
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    })
  }

  initForm(){
    if(this.edicion){
      this.productoService.listarPorId(this.id).subscribe(data=>{
        this.form = new FormGroup({
          'id' : new FormControl(data.idProducto),
          'marca': new FormControl(data.marca),
          'nombre': new FormControl(data.nombre),
          'precio': new FormControl(data.precio)
        });
      })
    }
  }

  guardar(){
    this.producto.idProducto = this.form.value['id'];
    this.producto.marca = this.form.value['marca'];
    this.producto.nombre = this.form.value['nombre'];
    this.producto.precio = this.form.value['precio'];

    if(this.edicion){
      this.productoService.modificar(this.producto).subscribe(data=>{
        this.productoService.listar().subscribe(productos =>{
          this.productoService.productoCambio.next(productos);
          this.productoService.mensajeCambio.next('Se modificó');
        })
      })
    }else{
      this.productoService.registrar(this.producto).subscribe(data=>{
        this.productoService.listar().subscribe(productos =>{
          this.productoService.productoCambio.next(productos);
          this.productoService.mensajeCambio.next('Se registró');
        })
      })
    }
    this.router.navigate(['producto']);
  }

}
