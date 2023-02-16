import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor(private toastr: ToastrService) { }
showSucces(texto,titulo){
  this.toastr.success(texto, titulo);

}
showError(texto,titulo){
  this.toastr.error(texto,titulo);
  
}
}
