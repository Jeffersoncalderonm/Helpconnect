import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsuariosService } from '../../../parameters/services/usuarios.service';
import { usuarios } from '../../../parameters/interfaces/usuarios.interface';

@Component({
  selector: 'app-new-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './new-usuario.component.html',
  styles: ``
})
export class NewUsuarioComponent implements OnInit {

  formUsuario!: FormGroup;

  private fb = inject(FormBuilder);
  private usuariosService = inject(UsuariosService);
  private router = inject(Router);

  ngOnInit(): void {
    this.formUsuario = this.fb.group({
  nombre: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  telefono: ['', Validators.required],
  contraseña: ['', Validators.required],
  role_id: ['', Validators.required],
  identificacion: ['', Validators.required],
  is_active: [true, Validators.required] 
});
  }

  onSubmit(): void {
    if (this.formUsuario.invalid)
      return;
    

    const nuevoUsuario: usuarios = this.formUsuario.value;

    this.usuariosService.postusuario(nuevoUsuario).subscribe({
      next: (usuarioCreado) => {
        console.log('Usuario registrado:', usuarioCreado);
        alert('¡Usuario registrado con éxito!');
        this.router.navigate(['/usuarios']); 
      },
      error: (error) => {
        console.error('Error al registrar el usuario:', error);
        alert('Ocurrió un error al registrar el usuario  88.');
      }
    });
  }
}
