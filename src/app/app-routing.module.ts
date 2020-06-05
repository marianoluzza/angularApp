import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { PersonasComponent } from './personas/personas.component';
import { PersonaDetalleComponent }  from './persona-detalle/persona-detalle.component';



const routes: Routes = [
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'agenda', component: PersonasComponent },
	{ path: 'detalles/:id', component: PersonaDetalleComponent },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
