import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

// MessageComponent mestra todos los mensajes del caché de MessageService

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  // MessageComponent inyecta MessageService cuando se crea
  // Debe ser público porque vamos a referenciarlo desde la plantilla
  constructor(public messageService: MessageService) {}

  ngOnInit(): void {
  }

}
