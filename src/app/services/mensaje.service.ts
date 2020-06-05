import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {
	mensajes: string[] = [];

  add(msg: string) {
    this.mensajes.push(msg);
  }
  clear() {
    this.mensajes = [];
  }
}
