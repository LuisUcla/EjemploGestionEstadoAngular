import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from './store/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [StoreService]
})
export class AppComponent {
  title = 'parking-lot-app';
  plate = ''
  vm$ = this.store.vm$

  constructor(private router: Router, private store: StoreService) {}

  onSubmit($event: Event) {
    $event.preventDefault()
    this.store.addCarToParkingLot(this.plate)
  }

  addPlate($event: Event) {
    const target = $event.target as HTMLButtonElement

    if (target.nodeName === 'BUTTON') {
        this.plate = target.innerHTML
    }
  }
}
