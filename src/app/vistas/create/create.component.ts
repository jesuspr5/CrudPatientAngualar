import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router'
import { ApiService } from '../../services/api/api.service'
import { pacienteI } from '../../modelos/paciente.interface'
import {ResponseI} from '../../modelos/response.interface'
import {AlertasService } from '../../services/alertas/alertas.service'
import { FormGroup, FormControl, Validators } from '@angular/forms'
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
 
  newForm = new FormGroup ({
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

  constructor(private api:ApiService, private router:Router, private alertas:AlertasService) { }

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    this.newForm.patchValue({
      'token':token
    });
  }

  postForm(form:any){
  this.api.postPatient(form).subscribe(data =>{
    console.log(data)
  })
  }
  salir(){
    this.router.navigate(['dashboard'])
  }
}
