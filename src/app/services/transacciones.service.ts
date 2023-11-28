import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransaccionesService {
  private readonly apiUrl = 'http://localhost:3000/api/transactions'; // Reemplaza con la URL real de tu servidor

  constructor(private http: HttpClient) {}

  // Peticion POST para crear una transacción
  async crearTransaccion(
    destino: any,
    cantidad: number,
    origen: any
  ) {
    const body = { destino, cantidad, origen };
    return await firstValueFrom(
      this.http.post<any>(`${this.apiUrl}/crearTransaccion`, body).pipe(take(1))
    );
  }

  // Peticion GET para obtener el historial de transacciones
  async historialTransacciones() {
    //return this.http.get(`${this.apiUrl}/historialTransacciones`);
    return await firstValueFrom(
      this.http.get<any>(`${this.apiUrl}/historialTransacciones`).pipe(take(1))
    );
  }
  async buscarTransacciones(username:any) {
    const params = new HttpParams().set('username', username);
    return await firstValueFrom(
      this.http.get<any>(`${this.apiUrl}/Transacciones`, { params }).pipe(take(1))
    );
  }
}
