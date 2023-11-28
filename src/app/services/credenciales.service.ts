import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CredencialesService {
  userActive: any;
  constructor() {}
  
  cambiarUsuario(usuario:any){
    this.userActive= usuario
  }
}
