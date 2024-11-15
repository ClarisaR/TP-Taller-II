import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { share, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GatitoService {

  private url = new BehaviorSubject<String>("");

  url$: Observable<String> = this.url.asObservable();

  constructor(protected httpClient: HttpClient) { }

  getGatito(){
    let res: Observable<Response[]> = 
      this.httpClient.get<Response[]>('https://api.thecatapi.com/v1/images/search')
      .pipe(share());
      //.pipe(catchError(this.handleError));
    
    res.subscribe(
        value=> {
            console.log('URL:' + value[0].url);
            this.url.next(value[0].url)
              }, 
        error => { 
          console.log('ocurrio un error');
          this.url.next("Ocurrio un error")
        });

  }
}
