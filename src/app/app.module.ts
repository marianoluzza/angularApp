import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';// <-- necesario para NgModel
import { HttpClientModule }    from '@angular/common/http';// <-- para peticionar

import { AppComponent } from './app.component';
import { PersonasComponent } from './personas/personas.component';
import { PersonaDetalleComponent } from './persona-detalle/persona-detalle.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonasComponent,
    PersonaDetalleComponent,
    MensajesComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
		AppRoutingModule,
		HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
