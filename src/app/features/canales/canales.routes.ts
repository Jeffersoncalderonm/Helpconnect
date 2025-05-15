import { Routes } from '@angular/router';
import { ChatComponent } from './componentes/chat/chat.component';
import { CorreosComponent } from './componentes/correos/correos.component';

export const CANALES_ROUTES: Routes = [
  { path: 'chat', component: ChatComponent },
  { path: 'correos', component: CorreosComponent },
  
];
