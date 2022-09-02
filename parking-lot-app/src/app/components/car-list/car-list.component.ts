import { Component, Input, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { StoreService } from 'src/app/store/store.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {

  @Input() cars: Car[] = []
  constructor(private store: StoreService) { }

  ngOnInit(): void {
  }

  delete(plate: string) {
    this.store.deleteCarToParkingLot(plate)
  }

}
