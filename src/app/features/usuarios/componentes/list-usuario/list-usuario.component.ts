import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { usuarios } from '../../../parameters/interfaces/usuarios.interface';
import { UsuariosService } from '../../../parameters/services/usuarios.service';

@Component({
  selector: 'app-list-usuario',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './list-usuario.component.html',
  styles: ``
})
export class ListUsuarioComponent implements OnInit {

  listusuarios: usuarios[] = [];

  private usuariosService = inject(UsuariosService);

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.usuariosService.getusuarios().subscribe({
      next: (data: usuarios[]) => {
        console.log('Usuarios cargados:', data);
        this.listusuarios = data;
      },
      error: (error) => {
        console.error('Error al cargar los usuarios:', error);
      }
    });
  }
}
