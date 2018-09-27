import { ActivatedRoute } from '@angular/router';
import { ProductoService } from './../../_service/producto.service';
import { Producto } from './../../_model/producto';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  dataSource: MatTableDataSource<Producto>;
  displayedColumns= ["idProducto", "nombre", "marca", "precio", "acciones" ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  cantidad: number;


  constructor(private productoService: ProductoService, private snackBar: MatSnackBar,
    public route: ActivatedRoute) { }

  ngOnInit() {

    this.productoService.productoCambio.subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.productoService.mensajeCambio.subscribe(data =>{
      this.snackBar.open(data, 'Aviso', {duration: 3000});
    });

    this.productoService.listarPageable(0, 10).subscribe(data=>{
      let productos = JSON.parse(JSON.stringify(data)).content;
      let cantidad = JSON.parse(JSON.stringify(data)).totalElements;

      this.dataSource = new MatTableDataSource(productos);
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  eliminar(idProducto:number){
    this.productoService.eliminar(idProducto).subscribe(data=>{
      this.productoService.listar().subscribe(data=>{
        this.productoService.productoCambio.next(data);
        this.productoService.mensajeCambio.next('Se eliminó');
      })
    })
  }

  mostrarOtraPagina(e:any){
    this.productoService.listarPageable(e.pageIndex, e.pageSize).subscribe(data=>{
      let productos = JSON.parse(JSON.stringify(data)).content;
      let cantidad = JSON.parse(JSON.stringify(data)).totalElements;

      this.dataSource = new MatTableDataSource(productos);
      this.dataSource.sort = this.sort;
    })
  }

}
