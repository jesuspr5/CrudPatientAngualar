import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute} from '@angular/router'
import { ApiService } from '../../services/api/api.service'
import { pacienteI } from '../../modelos/paciente.interface'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private api:ApiService, private activerouter:ActivatedRoute, private router:Router) { }


  ngOnInit(): void {
    let pacienteid = this.activerouter.snapshot.paramMap.get('id')!;
    let token = this.getToken();
    this.api.getPatient(pacienteid).subscribe(data => {
      console.log(data)
    })
    // console.log(pacienteid)
    // console.log(token)
  }

  getToken(){
    return localStorage.getItem('token')
  }

}
