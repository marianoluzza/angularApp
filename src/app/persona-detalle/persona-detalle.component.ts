import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Persona } from '../models/persona';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PersonaService } from '../services/persona.service';



@Component({
  selector: 'app-persona-detalle',
  templateUrl: './persona-detalle.component.html',
  styleUrls: ['./persona-detalle.component.css']
})
export class PersonaDetalleComponent implements OnInit {

	@Input()persona:Persona;
	@Output()nuevo:EventEmitter<any> = new EventEmitter();
	cargando:boolean;

  constructor(
		private route: ActivatedRoute, 
		private location: Location, 
		private personaService:PersonaService
	) { }

  ngOnInit(): void {
		//console.log("detail persona");
		const id = this.route.snapshot.paramMap.get('id');
		if(id)
			this.getPersona(id);
	}

	getPersona(id): void {
		this.cargando = true;
		this.personaService.getPersona(id)
			.subscribe(p => {
				this.cargando = false;
				this.persona = p
			});
	}
	guardarPersona(): void {
		let notificar = false;
		this.cargando = true;
		if(!this.persona._id)
			notificar = true;
		this.personaService.guardarPersona(this.persona)
			.subscribe(() => {
				this.cargando = false;
				if(notificar)
					this.nuevo.emit({
						target: this,
						value: this.persona
					});
			});
	}
	volver(): void{
		this.location.back();
	}
}
