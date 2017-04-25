import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'The 2017 CoE-ICT PSU Phuket Senior Projects';
  shortTitle = 'CIPP2017';

  constructor () { }

  ngOnInit() { }
}
