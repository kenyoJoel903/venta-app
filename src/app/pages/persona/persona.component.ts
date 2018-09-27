import { PersonaEdicionComponent } from './persona-edicion/persona-edicion.component';
import { PersonaService } from './../../_service/persona.service';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { Component, OnInit, ViewChild} from '@angular/core';
import { Persona } from '../../_model/persona';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  dataSource:MatTableDataSource<Persona>;
  displayedColumns=["idPersona", "nombres", "apellidos", "acciones"];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  cantidad: number;

  constructor(private personaService:PersonaService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.personaService.personaCambio.subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.personaService.mensajeCambio.subscribe(data =>{
      this.snackBar.open(data, 'Aviso', {duration: 3000});
    });

    this.personaService.listarPageable(0, 10).subscribe(data=>{
      console.log(data);
      let personas =  JSON.parse(JSON.stringify(data)).content;
      let cantidad = JSON.parse(JSON.stringify(data)).totalElements;

      console.log(personas);
      this.dataSource = new MatTableDataSource(personas);
      this.dataSource.sort = this.sort;
    });

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  eliminar(idPersona:number){
    this.personaService.eliminar(idPersona).subscribe(data=>{
      this.personaService.listar().subscribe(data =>{
        this.personaService.personaCambio.next(data);
        this.personaService.mensajeCambio.next('Se eliminó');
      })
    })
  }

  mostrarOtraPagina(e:any){
    this.personaService.listarPageable(e.pageIndex, e.pageSize).subscribe(data=>{
      let personas = JSON.parse(JSON.stringify(data)).content;
      let cantidad = JSON.parse(JSON.stringify(data)).totalElements;

      this.dataSource = new MatTableDataSource(personas);
      this.dataSource.sort = this.sort;
    })
  }

  openDialog(persona: Persona){
    let per = persona != null ? persona : {};
    this.dialog.open(PersonaEdicionComponent, {
      width: '250px',
      disableClose: true,
      data: per
    })
  }


}
