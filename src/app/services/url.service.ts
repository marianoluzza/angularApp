import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
	readonly base = "http://localhost:3000/api";
	readonly personas = this.base + "/personas";

	constructor() { }

}
