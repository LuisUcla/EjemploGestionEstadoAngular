import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'parking-lot-app';

  constructor(private router: Router) {}

  carsList() {
    this.router.navigateByUrl("car-list");
  }
}
