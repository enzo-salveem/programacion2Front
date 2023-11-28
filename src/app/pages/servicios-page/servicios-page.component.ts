import { Component } from '@angular/core';
import { CredencialesService } from 'src/app/services/credenciales.service';
import { CuentasService } from 'src/app/services/cuentas.service';
import { TransaccionesService } from 'src/app/services/transacciones.service';
import { jsPDF } from 'jspdf';
@Component({
  selector: 'app-servicios-page',
  templateUrl: './servicios-page.component.html',
  styleUrls: ['./servicios-page.component.css'],
})
export class ServiciosPageComponent {
  cuentaSeleccionada: string = '';
  montoIngresado: any;
  historialCuentas: any;
  cuentas: any;
  destino: string = '';

  constructor(
    private cuentasService: CuentasService,
    private credenciales: CredencialesService,
    private transacciones: TransaccionesService
  ) {}
  ngOnInit() {
    const userActiveString: any = localStorage.getItem('user');
    const userActive: any | null = userActiveString
      ? JSON.parse(userActiveString)
      : null;
    this.cuentasService
      .historialCuentas()
      .then((response) => {
        this.historialCuentas = response.cuentas;
      })
      .catch((error) => {
        console.error('Error al obtener historial de transacciones:', error);
      });
    this.cuentasService
      .buscarCuentas(userActive.id)
      .then((response) => {
        this.cuentas = response.cuentas;
      })
      .catch((error) => {
        console.error('Error al obtener historial de transacciones:', error);
      });
  }

  transferir() {
    if (this.destino && this.montoIngresado && this.cuentaSeleccionada) {
      let cuentaMonto = this.buscarCuentaPorId(this.cuentaSeleccionada)
      if (this.montoIngresado < cuentaMonto.saldo) {
        this.transacciones.crearTransaccion(
          this.destino,
          this.montoIngresado,
          this.cuentaSeleccionada
        );
        const fecha = new Date().toLocaleDateString();
        const pdf = new jsPDF();
        pdf.setFontSize(12);
        pdf.text(`Datos de la transferencia:`, 20, 20);
        pdf.text(`Id del Destino: ${this.destino}`, 20, 30);
        pdf.text(`Monto Transferido: ${this.montoIngresado}`, 20, 40);
        pdf.text(`Fecha: ${fecha}`, 20, 50);
        pdf.text(
          `Id de Cuenta Seleccionada: ${JSON.stringify(
            this.cuentaSeleccionada
          )}`,
          20,
          60
        );
        pdf.save('transferencia.pdf');
      } else {
        alert('Monto superior a la cuenta');
      }
    } else {
      alert('Faltan Datos por ingresar');
    }
  }

  buscarCuentaPorId(id: any) {
    return this.cuentas.find((cuenta: { id: any }) => cuenta.id == id);
  }
}
