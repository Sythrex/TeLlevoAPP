import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './registro/registro.component';
import { ViajeComponent } from './viaje/viaje.component';
import { ViajeconduComponent } from './viajecondu/viajecondu.component';
import { AuthGuard } from './auth/auth.guard';
import { ViajeModule } from './viaje/viaje.module';

const routes: Routes = [
  {
    path: 'registro',
    component: RegistroComponent,
    
    
  },
  {
    path: 'viaje',
    component: ViajeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'viajecondu',
    component: ViajeconduComponent,
    canActivate: [AuthGuard],
    
  },

  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
