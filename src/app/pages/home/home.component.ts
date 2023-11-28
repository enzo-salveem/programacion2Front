import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CredencialesService } from 'src/app/services/credenciales.service';
import { CuentasService } from 'src/app/services/cuentas.service';
import { TransaccionesService } from 'src/app/services/transacciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  transaccionesOriginales: any;
  transacciones: any;
  destinos: Set<any> = new Set();
  transaccionesFiltradas: any[] = [];
  destinoBuscado: any;
  cuentas: any;

  constructor(
    private transaccionesService: TransaccionesService,
    private cuentasService: CuentasService,
    private credenciales: CredencialesService
  ) {}
  ngOnInit() {
    const userActiveString: any = localStorage.getItem('user');
    const userActive: any | null = userActiveString
      ? JSON.parse(userActiveString)
      : null;

    //this.credenciales.userActive
    this.transaccionesService
      .buscarTransacciones(userActive.id)
      .then((response) => {
        this.transacciones = response.transacciones;
        this.transaccionesOriginales = response.transacciones;
      })
      .catch((error) => {
        console.error('Error al obtener historial de transacciones:', error);
      });
    //this.credenciales.userActive
    this.cuentasService
      .buscarCuentas(userActive.id)
      .then((response) => {
        this.cuentas = response.cuentas;
      })
      .catch((error) => {
        console.error('Error al obtener historial de transacciones:', error);
      });
  }
  buscarTransacciones() {
    interface Transaccion {
      origen: string;
      destino: string;
      cantidad: number;
      fecha_realizada: Date;
    }
    if (this.destinoBuscado) {
      this.transaccionesFiltradas = this.transaccionesOriginales.filter(
        (transaccion: Transaccion) =>
          transaccion.destino === this.destinoBuscado
      );
      this.transacciones = this.transaccionesFiltradas;
      this.destinoBuscado = '';
    } else {
      this.transacciones = this.transaccionesOriginales;
    }
  }
}
