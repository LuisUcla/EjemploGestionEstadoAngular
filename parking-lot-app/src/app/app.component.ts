import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Car } from './models/car';
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
  vm:any;
  constructor(private store: StoreService) {
    this.store.vm$.subscribe((data: any) => {
      this.vm = data

      if (this.vm.car) {
        this.vm.cars = this.vm.cars.filter((car: Car) => car.plate != this.vm.car);
        this.vm.car = '';
      }
      console.log(this.vm);
    })
  }

  onSubmit() {
    this.store.addCarToParkingLot(this.plate)
  }

  addPlate(event: Event) {
    const target = event.target as HTMLButtonElement;

    if (target.nodeName === 'BUTTON') {
        this.plate = target.innerHTML
    }
  }
  
}
