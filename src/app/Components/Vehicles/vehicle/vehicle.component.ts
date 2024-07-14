import { Component } from '@angular/core';
import { TabsTextEnum, TabsValueEnum } from '../../../Enum/Tabs.Enum';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.css'
})
export class VehicleComponent {
  tabtitle1:TabsTextEnum=TabsTextEnum.Save;
  tabtitle2:TabsTextEnum=TabsTextEnum.Previous;
  tabactive:TabsValueEnum=TabsValueEnum.Save;
}

