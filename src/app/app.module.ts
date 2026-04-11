import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { InstructionsComponent } from './components/instructions/instructions.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeAppComponent } from './components/home-app/home-app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Activity1Component } from './components/activity1/activity1.component';
import { ResultadosComponent } from './components/resultados/resultados.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { CalificacionesComponent } from './components/calificaciones/calificaciones.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginTeacherComponent } from './components/login-teacher/loginT.component';
import { PruebaComponent } from './libro/components/prueba/prueba.component';
import { LibroComponent } from './libro/components/libro/libro.component';
import { LibroDetailComponent } from './libro/components/libro-detail/libro-detail.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { EstrategiasComponent } from './components/estrategias/estrategias.component';
import { RecomenderComponent } from './components/recomender/recomender.component';
import { LecturaComponent } from './components/lectura/lectura.component';
import { LecturaDetailComponent } from './components/lectura-detail/lectura-detail.component';
import { TipComponent } from './components/tip/tip.component';
import { BienvenidoComponent } from './components/bienvenido/bienvenido.component';
import { CuestionarioViewerComponent } from './cuestionario-viewer/cuestionario-viewer.component';
import { SafeUrlPipe } from './safe-url.pipe';
import { LibroViewerComponent } from './libro-viewer/libro-viewer.component';
import { StatisticsComponent } from './statistics/statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    InstructionsComponent,
    NavbarComponent,
    HomeAppComponent,
    Activity1Component,
    ResultadosComponent,
    TeacherComponent,
    CalificacionesComponent,
    LoginTeacherComponent,
    SignupComponent,
    PruebaComponent,
    LibroComponent,
    LibroDetailComponent,
    PageNotFoundComponent,
    LayoutComponent,
    EstrategiasComponent,
    RecomenderComponent,
    LecturaComponent,
    LecturaDetailComponent,
    TipComponent,
    BienvenidoComponent,
    CuestionarioViewerComponent,
    SafeUrlPipe,
    LibroViewerComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    CoreModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
