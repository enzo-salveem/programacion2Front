import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private readonly apiUrl = 'http://localhost:3000/api'; // Reemplaza con la URL real de tu servidor

  constructor(private http: HttpClient) {}

  async buscarUsuarios() {
    return await firstValueFrom(
      this.http.get<any>(`${this.apiUrl}/accounts`).pipe(take(1))
    );
  }
}
