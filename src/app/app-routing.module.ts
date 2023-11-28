import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';

import { AuthGuard } from './auth.guard'; // Ajusta la ruta según la ubicación real de tu guardia
import { TransaccionesPageComponent } from './pages/transacciones-page/transacciones-page.component';
import { UsuariosPageComponent } from './pages/usuarios-page/usuarios-page.component';
import { ServiciosPageComponent } from './pages/servicios-page/servicios-page.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent,canActivate: [AuthGuard] },
  { path: 'transacciones', component: TransaccionesPageComponent ,canActivate: [AuthGuard] },
  { path: 'usuarios', component: UsuariosPageComponent ,canActivate: [AuthGuard] },
  { path: 'servicios', component: ServiciosPageComponent ,canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
