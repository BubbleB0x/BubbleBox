import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'reg',
    loadChildren: () => import('./pages/reg/reg.module').then( m => m.RegPageModule)
  },
  {
    path: 'reporting',
    loadChildren: () => import('./pages/reporting/reporting.module').then( m => m.ReportingPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'device',
    loadChildren: () => import('./pages/device/device.module').then( m => m.DevicePageModule),
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
