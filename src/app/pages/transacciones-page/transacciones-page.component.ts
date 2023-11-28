import { Component } from '@angular/core';
import { TransaccionesService } from 'src/app/services/transacciones.service';

@Component({
  selector: 'app-transacciones-page',
  templateUrl: './transacciones-page.component.html',
  styleUrls: ['./transacciones-page.component.css'],
})
export class TransaccionesPageComponent {
  transacciones: any;

  constructor(private transaccionesService: TransaccionesService) {}
  ngOnInit() {
    this.transaccionesService
      .historialTransacciones()
      .then((response) => {
        this.transacciones = response.transacciones;
      })
      .catch((error) => {
        console.error('Error al obtener historial de transacciones:', error);
      });
  }
}
