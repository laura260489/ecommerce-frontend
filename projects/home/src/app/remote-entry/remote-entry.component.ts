
import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-remote-entry',
  templateUrl: './remote-entry.component.html',
  styleUrls: ['./remote-entry.component.scss']
})
export class RemoteEntryComponent {
  constructor(private router:Router) { }

  navigate(){
    console.log('Navigating to product');
    this.router.navigate(['producto']);
  }

}
