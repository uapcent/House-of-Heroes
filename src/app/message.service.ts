import { Injectable } from '@angular/core';
// Una caché de mensajes
@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];
  //Añade un mensaje a la lista de mensajes pendientes (caché)
  add(message: string) {
    this.messages.push(message);
  }
  //Vacía la lista de mensajes
  clear() {
    this.messages = [];
  }
}
