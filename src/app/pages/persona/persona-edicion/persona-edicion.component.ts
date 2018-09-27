import { Persona } from './../../../_model/persona';
import { PersonaService } from './../../../_service/persona.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-persona-edicion',
  templateUrl: './persona-edicion.component.html',
  styleUrls: ['./persona-edicion.component.css']
})
export class PersonaEdicionComponent implements OnInit {

  persona:Persona;

  constructor(private dialogRef: MatDialogRef<PersonaEdicionComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: Persona,
    private personaService:PersonaService) { }

  ngOnInit() {
    this.persona = {
      idPersona : this.data.idPersona,
      nombres: this.data.nombres,
      apellidos: this.data.apellidos
    }
  }

  cancelar() {
    this.dialogRef.close();
  }

  guardar(){
    if(this.persona != null && this.persona.idPersona > 0){
      this.personaService.modificar(this.persona).subscribe(data_=>{
        this.personaService.listar().subscribe(personas =>{
          this.personaService.personaCambio.next(personas);
          this.personaService.mensajeCambio.next("Se modificó");
        })
      })
    }else{
      this.personaService.registrar(this.persona).subscribe(data =>{
        this.personaService.listar().subscribe(personas =>{
          this.personaService.personaCambio.next(personas);
          this.personaService.mensajeCambio.next("Se registro");
        })
      })
    }
    this.dialogRef.close();
  }

}
