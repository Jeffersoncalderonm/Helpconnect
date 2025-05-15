import { Routes } from '@angular/router';
import { ContactarComponent } from './componentes/contactar/contactar.component';
import { GuiaComponent } from './componentes/guia/guia.component';
import { PreguntasComponent } from './componentes/preguntas/preguntas.component';

export const SOPORTE_ROUTES: Routes = [
  { path: 'contactar', component: ContactarComponent },
  { path: 'guia', component: GuiaComponent },
  { path: 'preguntas', component: PreguntasComponent },
 
];