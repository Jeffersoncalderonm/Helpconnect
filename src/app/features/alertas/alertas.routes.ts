import { Routes } from '@angular/router';
import { PendientesComponent } from './componentes/pendientes/pendientes.component';
import { UrgentesComponent } from './componentes/urgentes/urgentes.component';

export const ALERTAS_ROUTES: Routes = [
  { path: 'pendientes', component: PendientesComponent },
  { path: 'urgentes', component: UrgentesComponent }
];
