import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { usuarios } from '../interfaces/usuarios.interface';
import { ApiResponse } from '../../../interfaces/apiresponse.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/parameters/usuarios';

  constructor() {}

  /** Recupera el listado de usuarios */
  getusuarios(): Observable<usuarios[]> {
    return this.http.get<ApiResponse<usuarios[]>>(this.apiUrl).pipe(
      map((response) => response.data),
      catchError((error) => {
        console.error('Error al obtener los usuarios:', error);
        return throwError(() => error);
      })
    );
  }

getusuarioById(id: number): Observable<usuarios> {
  const url = `${this.apiUrl}/${id}`;
  return this.http.get<ApiResponse<usuarios>>(url).pipe(
    map((response) => response.data),
    catchError((error) => {
      console.error(`Error al obtener usuario con ID ${id}:`, error);
      return throwError(() => error);
    })
  );
}

  
postusuario(nuevoUsuario: usuarios): Observable<usuarios> {
  return this.http.post<ApiResponse<usuarios>>(this.apiUrl, nuevoUsuario).pipe(
    map((response) => response.data),
    catchError((error) => {
      console.error('Error al crear el usuario:', error);
      return throwError(() => error);
    })
  );
}


  /** Actualiza un usuario existente por ID */
  /**updateusuario(id: number, usuario: usuarios): Observable<ApiResponse<usuarios>> {
  const url = `${this.apiUrl}/${id}`;
  return this.http.put<ApiResponse<usuarios>>(url, usuario).pipe(
    catchError((error) => {
      console.error(`Error al actualizar el usuario con ID ${id}:`, error);
      return throwError(() => error);
    })
  );
}

  /** Elimina un usuario por ID */
 /** deleteusuario(id: number): Observable<ApiResponse<usuarios>> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<ApiResponse<usuarios>>(url).pipe(
      catchError((error) => {
        console.error(`Error al eliminar el usuario con ID ${id}:`, error);
        return throwError(() => error);
      })
    );
  }*/
}
