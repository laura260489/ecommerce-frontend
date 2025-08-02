import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EventBusService } from '../../../logic/services/event-bus/event-bus.service';

@Injectable({
  providedIn: 'root'
})

/**
** Controla mostrar o no el spinner en cualquier página.
* @autor laurarojasseguros and JesusMancilla-SB
*/
export class LoaderSpinnerService {

  private activeRequests = 0;
  private spinnerSubject = new BehaviorSubject<boolean>(false);


  spinnerState$ = this.spinnerSubject.asObservable();
  //* Se debe inicializar en falso.
  private isShow=false;

  constructor(private eventBus: EventBusService) { }
  /**
   * Sirve para obtener el valor de  la variable isShow
   * @returns El valor de la variable isShow
   * @autor laurarojasseguros and JesusMancilla-SB
   */
  getIsShow():boolean{

    return this.isShow;

  }

  /**
   * Sirve para asignar a la variable isShow un valor booleano
   * @param {boolean} isShow.
   * @autor laurarojasseguros and JesusMancilla-SB
   */
  setIsShow(isShow:boolean){
    this.isShow = isShow;
    // Emitir evento global para que el loader lo escuche
    this.eventBus.sendMessage({
      to: 'spinner',
      message: { isShowSpinner: isShow }
    });
  }
}
