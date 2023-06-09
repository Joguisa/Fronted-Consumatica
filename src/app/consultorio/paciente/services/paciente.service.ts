import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Paciente } from '../interfaces/paciente';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  private endPoint: string = environment.endPoint;
  private apiUrl: string = this.endPoint + 'api/';

  constructor(private http: HttpClient) {}

  getPaciente(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.apiUrl}pacientes`).pipe(
      catchError(error => {
        console.error(error, 'Error al obtener la lista de pacientes');
      throw error; // Lanza el error para que sea manejado por el interceptor de errores
      })
    );;
  }

  addPaciente(modelo: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(`${this.apiUrl}pacientes`, modelo);
  }

  updatePaciente(modelo: Paciente, id: number): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.apiUrl}pacientes/${id}`, modelo);
  }

  deletePaciente(cedula: string): Observable<Paciente> {
    return this.http.delete<Paciente>(`${this.apiUrl}pacientes/${cedula}`);
  }
}
