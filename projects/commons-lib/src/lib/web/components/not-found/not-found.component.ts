import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

/**
** Página para redirecciones not found
* @autor laurarojasseguros and JesusMancilla-SB
*/
export class NotFoundComponent implements OnInit {
  constructor(private router: Router) {}

  //Emite un mensaje para que no se muestre header ni menú
  ngOnInit(): void {
    
  }
}
