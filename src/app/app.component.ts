import { Component, VERSION ,OnInit} from '@angular/core';
import {Subject,interval,fromEvent,map,switchMap,mergeAll,mergeMap, distinctUntilChanged,debounceTime} from "rxjs"
import { ajax } from 'rxjs/ajax';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  search = "";
  //stream
  input$=new Subject<string>();
  interval$=interval(1000);
  fromEvent$=fromEvent(document,'click')
  ngOnInit( ){
this.input$.pipe(
  distinctUntilChanged(),
  debounceTime(100), 
  switchMap((value)=>{
    return ajax.getJSON(`https://api.github.com/users/${value}`)
    
      }),
//   map((value)=>{
// return ajax.getJSON(`https://api.github.com/users/${value}`)

//   }),
  // mergeAll()
).subscribe(res=>{
console.log(res)
})

///mergeMap================================
// this.fromEvent$.pipe(mergeMap((value)=>{
// return this.interval$;
// })).subscribe(res=>{
//   console.log(res)
// })
//switchMap==============================
// this.fromEvent$.pipe(switchMap((value)=>{
//   return this.interval$;
//   })).subscribe(res=>{
//     console.log(res)
//   })



  }


}
