import { Component } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios-page',
  templateUrl: './usuarios-page.component.html',
  styleUrls: ['./usuarios-page.component.css'],
})
export class UsuariosPageComponent {
  transacciones: any;
  usuarios: any;
  constructor(private usuariosService: UsuariosService) {}
  ngOnInit() {
    this.usuariosService
      .buscarUsuarios()
      .then((response) => {
        this.usuarios = response.usuarios;
      })
      .catch((error) => {
        console.error('Error al obtener historial de transacciones:', error);
      });
  }
}
