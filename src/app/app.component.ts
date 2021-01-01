import { Component, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  faIcon = faCoffee;
  constructor() { }
  ngOnInit() { }

  fireSwal() {
    Swal.fire('Hello world!');
  }
}
