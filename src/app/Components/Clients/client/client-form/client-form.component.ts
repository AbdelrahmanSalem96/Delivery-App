import { Component } from '@angular/core';
import { ClientModel } from '../../../../Models/Client/Client.Model';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.css'
})
export class ClientFormComponent {
  client:ClientModel = new ClientModel();
  deleted = ["True", "False"];
}
