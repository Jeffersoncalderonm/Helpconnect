import { Routes } from '@angular/router';
import { ListUsuarioComponent } from './componentes/list-usuario/list-usuario.component';
import { NewUsuarioComponent } from './componentes/new-usuario/new-usuario.component';
import { MyPerfilComponent } from './componentes/my-perfil/my-perfil.component';
import { RolPermisoComponent } from './componentes/rol-permiso/rol-permiso.component';

export const USUARIOSS_ROUTES: Routes = [
  { path: 'list', component: ListUsuarioComponent },
  { path: 'new', component: NewUsuarioComponent },
  { path: 'perfil', component: MyPerfilComponent },
  { path: 'roles-permisos', component: RolPermisoComponent }
];
