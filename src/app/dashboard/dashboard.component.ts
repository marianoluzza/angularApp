import { Component, OnInit } from '@angular/core';
import { Persona } from '../models/persona';
import { PersonaService } from '../services/persona.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	personas: Persona[] = [];

  constructor(private personaService: PersonaService) { }

  ngOnInit() {
    this.getPersonas();
  }

  getPersonas(): void {
    this.personaService.getPersonas()
      .subscribe(personas => this.personas = personas.slice(0, 3));
  }

}
