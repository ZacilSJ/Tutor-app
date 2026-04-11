import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Activity1Component } from './components/activity1/activity1.component';
import { CalificacionesComponent } from './components/calificaciones/calificaciones.component';
import { HomeAppComponent } from './components/home-app/home-app.component';
import { InstructionsComponent } from './components/instructions/instructions.component';
import { LoginComponent } from './components/login/login.component';
import { CuestionarioViewerComponent } from './cuestionario-viewer/cuestionario-viewer.component';
import { ResultadosComponent } from './components/resultados/resultados.component';
import { SignupComponent } from './components/signup/signup.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { PruebaComponent } from './libro/components/prueba/prueba.component';
import { LibroViewerComponent } from './libro-viewer/libro-viewer.component';
import { LibroComponent } from './libro/components/libro/libro.component';
import { LibroDetailComponent } from './libro/components/libro-detail/libro-detail.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LayoutComponent } from './layout/layout.component';
import { EstrategiasComponent } from './components/estrategias/estrategias.component';
import { RecomenderComponent } from './components/recomender/recomender.component';
import { LecturaComponent } from './components/lectura/lectura.component';
import { LecturaDetailComponent } from './components/lectura-detail/lectura-detail.component';
import { AuthGuard } from './guards/auth.guard';
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [

  //RUTAS PÚBLICAS
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  // REDIRECCIÓN PRINCIPAL (IMPORTANTE)
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // RUTAS CON LAYOUT
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'homeapp', component: HomeAppComponent },
      { path: 'strategies', component: EstrategiasComponent, canActivate: [AuthGuard] },
      { path: 'recomender', component: RecomenderComponent, canActivate: [AuthGuard] },
      { path: 'lectura', component: LecturaComponent, canActivate: [AuthGuard] },
      { path: 'lectura/:id', component: LecturaDetailComponent, canActivate: [AuthGuard] },
      { path: 'cuestionario/:id', component: CuestionarioViewerComponent, canActivate: [AuthGuard] },
      { path: 'instructions', component: InstructionsComponent, canActivate: [AuthGuard] },
      { path: 'activity/1', component: Activity1Component },
      { path: 'resultados', component: ResultadosComponent, canActivate: [AuthGuard] },
      { path: 'statistics', component: StatisticsComponent },
      { path: 'prueba', component: PruebaComponent },
      { path: 'libros', component: LibroComponent },
      { path: 'libro/:id', component: LibroDetailComponent },
      { path: 'libro/:id/leer', component: LibroViewerComponent },
      { path: 'teacher', component: TeacherComponent },
      { path: 'generalstatistics', component: CalificacionesComponent },
    ]
  },

 
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
