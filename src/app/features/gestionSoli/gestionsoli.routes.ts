import { Routes } from "@angular/router";
import { MySolicitudComponent } from "./componentes/my-solicitud/my-solicitud.component";
import { NewSolicitudComponent } from "./componentes/new-solicitud/new-solicitud.component";


export const GESTIONSOLI_ROUTES: Routes = [
    { path: 'new-solicitud', component: NewSolicitudComponent },
    { path: 'my-solicitud', component: MySolicitudComponent },
    { path: '', redirectTo: 'new-solicitud', pathMatch: 'full' } // Redirección por defecto
  ];
