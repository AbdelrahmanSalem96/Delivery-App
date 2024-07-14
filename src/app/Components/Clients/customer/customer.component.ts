import { Component } from '@angular/core';
import { TabsTextEnum, TabsValueEnum } from '../../../Enum/Tabs.Enum';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  tabtitle1:TabsTextEnum=TabsTextEnum.Save;
  tabtitle2:TabsTextEnum=TabsTextEnum.Previous;
  tabactive:TabsValueEnum=TabsValueEnum.Save;
}
