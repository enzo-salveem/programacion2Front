import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';

//Login
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule } from '@angular/forms'; // Agrega FormsModule
import { AuthInterceptor } from './auth.interceptor';
import { HomeComponent } from './pages/home/home.component';
import { TransaccionesPageComponent } from './pages/transacciones-page/transacciones-page.component';
import { UsuariosPageComponent } from './pages/usuarios-page/usuarios-page.component';
import { ServiciosPageComponent } from './pages/servicios-page/servicios-page.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent, TransaccionesPageComponent, UsuariosPageComponent, ServiciosPageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
        allowedDomains: ['localhost:3000'], // Reemplaza con tu dominio real
        disallowedRoutes: [],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
