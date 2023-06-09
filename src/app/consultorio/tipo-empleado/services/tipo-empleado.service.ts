import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoEmpleado } from '../interfaces/tipo-empleado';
@Injectable({
  providedIn: 'root',
})
export class TipoEmpleadoService {
  private endPoint: string = environment.endPoint;
  private apiUrl: string = this.endPoint + 'api/';

  constructor(private http: HttpClient) {}

  getTipos(): Observable<TipoEmpleado[]> {
    return this.http.get<TipoEmpleado[]>(`${this.apiUrl}tipoEmpleado`).pipe(
      catchError(error => {
        console.error(error, 'Error al obtener la lista de tipos de empleados');
      throw error; // Lanza el error para que sea manejado por el interceptor de errores
      })
    );;
  }

  addTipos(modelo: TipoEmpleado): Observable<TipoEmpleado> {
    return this.http.post<TipoEmpleado>(`${this.apiUrl}tipoEmpleado`, modelo);
  }

  updateTipos(modelo: TipoEmpleado, id: number): Observable<TipoEmpleado> {
    return this.http.put<TipoEmpleado>(
      `${this.apiUrl}tipoEmpleado/${id}`,
      modelo
    );
  }

  deleteTipos(id: number): Observable<TipoEmpleado> {
    return this.http.delete<TipoEmpleado>(`${this.apiUrl}tipoEmpleado/${id}`);
  }
}
