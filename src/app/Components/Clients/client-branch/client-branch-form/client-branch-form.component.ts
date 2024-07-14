import { Component } from '@angular/core';
import { ClientBranchModel } from '../../../../Models/Client Branch/ClientBranch.Model';

@Component({
  selector: 'app-client-branch-form',
  templateUrl: './client-branch-form.component.html',
  styleUrl: './client-branch-form.component.css'
})
export class ClientBranchFormComponent {
  clientBranch: ClientBranchModel = new ClientBranchModel();
  autoAssignTo = ["True", "False"];
}
