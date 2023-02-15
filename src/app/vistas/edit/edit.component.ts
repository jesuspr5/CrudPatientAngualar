import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute} from '@angular/router'
import { ApiService } from '../../services/api/api.service'
import { pacienteI } from '../../modelos/paciente.interface'
import {ResponseI} from '../../modelos/response.interface'
import {AlertasService } from '../../services/alertas/alertas.service'
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private api:ApiService, private activerouter:ActivatedRoute, private router:Router,private alertas:AlertasService) { }

  datosPacientes:pacienteI | undefined;
  editForm = new FormGroup ({
    nombre : new FormControl(''),
    correo : new FormControl(''),
    dni : new FormControl(''),
    direccion : new FormControl(''),
    codigoPostal : new FormControl(''),
    genero : new FormControl(''),
    telefono :  new FormControl(''),
    fechaNacimiento :  new FormControl(''),
    token :  new FormControl(''),
    pacienteId :  new FormControl(''), 

  })

  ngOnInit(): void {
    let pacienteid = this.activerouter.snapshot.paramMap.get('id')!;
    let token = this.getToken();
    this.api.getPatient(pacienteid).subscribe(data => {
      this.datosPacientes = data[0]
      this.editForm.setValue({
        'nombre' : this.datosPacientes?.Nombre!, 
        'correo' : this.datosPacientes?.Correo!,
        'dni' : this.datosPacientes?.DNI!,
        'direccion' : this.datosPacientes?.Direccion!,
        'codigoPostal' : this.datosPacientes?.CodigoPostal!,
        'genero' : this.datosPacientes?.Genero!,
        'telefono' : this.datosPacientes?.Telefono!,
        'fechaNacimiento' : this.datosPacientes?.FechaNacimiento!,
        'token' : token,
        'pacienteId' : pacienteid
      })
     
    })
    // console.log(pacienteid)
    // console.log(token)
  }

  getToken(){
    return localStorage.getItem('token')
  }
  postForm(form: any){
  this.api.putPatient(form).subscribe(data=> {
    let respuesta:ResponseI = data;
    if(respuesta.status == "ok"){
      this.alertas.showSucces('datos modificados','Hecho');
    }else
    this.alertas.showError(respuesta.result.error_msg,'Error');
    
  })
  }
  eliminar(){

    let datos:any = this.editForm.value;
    this.api.delete(datos).subscribe(data=>{
      let respuesta:ResponseI = data;
    if(respuesta.status == "ok"){
      this.alertas.showSucces('paciente eliminado','Hecho');
      this.router.navigate(['dashboard']);
    }else
    this.alertas.showError(respuesta.result.error_msg,'Error');
    })
  }
  salir(){
    this.router.navigate(['dashboard'])
  }
}