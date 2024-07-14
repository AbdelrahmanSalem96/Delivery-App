import { Injectable } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

import { InitialConstants } from '../../Core/Constant/InitialConstant';

@Injectable({
  providedIn: 'root'
})

export class SpinnerService {

  constructor(private snipper: NgxSpinnerService) { }

  // show(){this.snipper.show();}

  // hide(){this.snipper.hide();}

  show(){this.snipper.show("spinner-previousdata-search");}

  hide(){this.snipper.hide("spinner-previousdata-search");}

  getSpinner(){this.snipper.getSpinner(InitialConstants.DefaultString);}

}
