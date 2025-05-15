import { Routes } from '@angular/router';
import { ResumenComponent } from './componentes/resumen/resumen.component';
import { ExportarComponent } from './componentes/exportar/exportar.component';

export const REPORTES_ROUTES: Routes = [
  { path: 'resumen', component: ResumenComponent },
  { path: 'exportar', component: ExportarComponent }
];
