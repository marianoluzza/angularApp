import { Component, OnInit } from '@angular/core';
import { Persona } from '../models/persona';
import { PersonaService } from '../services/persona.service';
import { MensajeService } from '../services/mensaje.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

	agenda: Array<Persona>;
	personaSeleccionada: Persona = null;
	private personaService: PersonaService

  constructor(personaService: PersonaService, private mensajeService: MensajeService) {
		this.personaService = personaService;
	 }

  ngOnInit(): void {
		this.getPersonas();
	}
	onNuevo(e): void{
		this.agenda.push(e.value);
	}

	getPersonas(): void {
		this.personaService.getPersonas().subscribe(personas => this.agenda = personas);
	}
	nueva(): void {
		this.personaSeleccionada = {
			_id: "",
			nombre: "",
			celular: "",
			nacimiento: null,
			email: "",
		};
		this.mensajeService.add(`PersonaService: Nueva Persona`);
	}
	eliminar(i):void{
		this.personaService.eliminarPersona(this.agenda[i])
			.subscribe(() => this.agenda.splice(i,1));
	}
	ver(persona: Persona): void {
		this.personaSeleccionada = persona;
		this.mensajeService.add(`PersonaService: Persona seleccionada id=${persona._id}`);
	}
	guardarPersona(): void {
		this.personaService.guardarPersona(this.personaSeleccionada)
			.subscribe((p) => this.agenda.push(p));
	}
}
