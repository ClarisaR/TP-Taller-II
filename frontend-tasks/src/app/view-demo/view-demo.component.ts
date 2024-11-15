import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { share, catchError } from 'rxjs/operators';
import { GatitoService } from '../gatito.service';
import { Response } from './response';

@Component({
  templateUrl: './view-demo.component.html',
  styleUrls: ['./view-demo.component.css']
})
export class ViewDemoComponent implements OnInit {

  url: String;

  constructor(protected router:Router, protected gatitoService: GatitoService) { 
    console.log('viewdemo constructor');
  }

  ngOnInit(): void {
    this.gatitoService.url$.subscribe({
      next: nextGatitoUrl => this.url = nextGatitoUrl
    })
  }

  onClick(){
    console.log('ejecutando redirect en view demo');
    this.router.navigate(['/'])
  }

  changeKitty(){
    this.gatitoService.getGatito()
  }

}
