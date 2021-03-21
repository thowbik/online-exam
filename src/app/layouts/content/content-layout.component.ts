import { Component, OnInit, AfterViewInit, ElementRef, Inject, Renderer2, ViewChild } from '@angular/core';
// import { ConfigService } from 'app/shared/services/config.service';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-content-layout',
    templateUrl: './content-layout.component.html',
    styleUrls: ['./content-layout.component.scss']
})

export class ContentLayoutComponent implements OnInit, AfterViewInit {
 


  constructor(
    ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
}
}
