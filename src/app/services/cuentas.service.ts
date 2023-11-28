import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuentasService {

  private readonly apiUrl = 'http://localhost:3000/api/cuentas'; // Reemplaza con la URL real de tu servidor

  constructor(private http: HttpClient) {}

  crearTransaccion(
    nroCuenta: string,
    tipo: string,
    saldo: number
  ): Observable<any> {
    const body = { nroCuenta, tipo, saldo };
    return this.http.post(`${this.apiUrl}/crearCuenta`, body);
  }
  async historialCuentas() {
    return await firstValueFrom(
      this.http.get<any>(`${this.apiUrl}/historialCuentas`).pipe(take(1))
    );
  }
  async buscarCuentas(userId:any) {
    const params = new HttpParams().set('userId', userId);
    return await firstValueFrom(
      this.http.get<any>(`${this.apiUrl}/BuscarCuenta`, { params }).pipe(take(1))
    );
  }
}
