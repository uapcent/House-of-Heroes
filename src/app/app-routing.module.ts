import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

//Routes indica al router que vista cargar cuando un usuario pulsa un enlace o
// carga una URL desde el navegador. Se importa HeroesComponent para que tenga una ruta por defecto

// path: Cadena que indica la URL
// component: El componente que se crea al acceder a la URL
// Path: '' será la ruta per defecte, la pantalla inicial
// " : " indica que id es un parámetre per a un héroes especific
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
