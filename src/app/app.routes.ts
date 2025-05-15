import { Routes } from "@angular/router";


export const routes: Routes =[ 
    {
        path: '',
       
        loadComponent: () => import('./features/dashboard/dashboard.component').then(c => c.DashboardComponent)
    },
    {
        path: 'dashboard',
        
         loadComponent: () => import('./features/dashboard/dashboard.component').then(c => c.DashboardComponent)
    },
    {
        path: 'gestionsoli',
         loadChildren: () => import('./features/gestionSoli/gestionsoli.routes').then(c => c.GESTIONSOLI_ROUTES)
    },
    {
        path: 'canales',
        loadChildren: () => import('./features/canales/canales.routes').then(c => c.CANALES_ROUTES)
    },
    {
        path: 'reportes',
        loadChildren: () => import('./features/reportes/reportes.routes').then(c => c.REPORTES_ROUTES)
    },
    {
        path: 'usuarios',
        loadChildren: () => import('./features/usuarios/usuarios.routes').then(c => c.USUARIOSS_ROUTES)
    },
    { 
        path: 'alertas', 
        loadChildren: () => import('./features/alertas/alertas.routes').then(c => c.ALERTAS_ROUTES) 
    },
    { 
        path: 'soporte', 
        loadChildren: () => import('./features/soporte/soporte.routes').then(c => c.SOPORTE_ROUTES) 
    },
    {

        path: '**',
         loadComponent: () => import('./layout/page-not-found/page-not-found.component').then(c => c.PageNotFoundComponent)
    }
    



];