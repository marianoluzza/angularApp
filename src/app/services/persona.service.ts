import { Injectable } from '@angular/core';
import { Persona } from '../models/persona';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MensajeService } from './mensaje.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

	constructor(
		private http: HttpClient,
		private mensajeService: MensajeService,
		private urlService: UrlService
	) { }
	
	private log(message: string) {
		this.mensajeService.add(`PersonaService: ${message}`);
	}
	/**
	 * Handle Http operation that failed.
	 * Let the app continue.
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {

			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// TODO: better job of transforming error for user consumption
			this.log(`${operation} failed: ${error.message}`);

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}
	getPersonas(): Observable<Persona[]> {
		/*let personas = new Array<Persona>();
		personas.push({
			id: 1,
			nombre: "Mariano",
			celular: "123",
			email: "mluzza@ulp.edu.ar",
			nacimiento: new Date(2000, 1, 1)
		});
		this.log('personas fetched');
		return of(personas);*/
		return this.http.get<Persona[]>(this.urlService.personas)
		.pipe(
      tap(_ => this.log('personas fetched')),
      catchError(this.handleError<Persona[]>('getPersonas', []))
    );
	}

	getPersona(id:string): Observable<Persona> {
		/*let persona:Persona;
		persona = {
			id: 1,
			nombre: "Mariano",
			celular: "123",
			email: "mluzza@ulp.edu.ar",
			nacimiento: new Date(2000, 1, 1)
		};
		this.log(`persona (${id}) fetched`);
		return of(persona);*/
		console.log(id);
		return this.http.get<Persona>(`${this.urlService.personas}/${id}`)
		.pipe(
      tap(_ => this.log(`persona (${id}) fetched`)),
      catchError(this.handleError<Persona>('getPersona'))
    );
	}
	
	guardarPersona(persona:Persona): Observable<any> {
		if(persona._id) {
			return this.http.put(`${this.urlService.personas}/${persona._id}`, persona, this.httpOptions).pipe(
				tap(_ => this.log(`persona actualizada (${persona._id})`)),
				catchError(this.handleError<any>('guardarPersona'))
			);
		}
		else {
			return this.http.post(`${this.urlService.personas}`, persona, this.httpOptions).pipe(
				tap(_ => this.log(`persona creada (${persona._id})`)),
				catchError(this.handleError<any>('guardarPersona'))
			);
		}
	}
	
	eliminarPersona(persona:Persona): Observable<any> {
		return this.http.delete(`${this.urlService.personas}/${persona._id}`).pipe(
			tap(_ => this.log(`persona eliminada (${persona._id})`)),
			catchError(this.handleError<any>('eliminarPersona'))
		);
	}
}
