import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../../../parameters/services/usuarios.service';
import { usuarios } from '../../../parameters/interfaces/usuarios.interface';

@Component({
  selector: 'app-my-perfil',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './my-perfil.component.html',
  styles: []
})
export class MyPerfilComponent implements OnInit {
  perfilUsuario: usuarios | undefined;

  private usuarioService = inject(UsuariosService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); 

    if (!isNaN(id)) {
      this.usuarioService.getusuarioById(id).subscribe({
        next: (response: usuarios) => {
          this.perfilUsuario = response;
          console.log('Usuario obtenido:', this.perfilUsuario);
        },
        error: (err: any) => {
          console.error('Error al obtener el perfil:', err);
        }
      });
    } else {
      console.error('ID inválido en la URL');
    }
  }
}