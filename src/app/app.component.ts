import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private http: HttpClient) {
  }
  title = 'ng';
  ngOnInit(): void {
    // this.http.post("http://localhost:8080/demo/add?name=Roshan&email=roshanmali.888@gmail.com", null).subscribe(res => {
    //   debugger
    // })
  }
}
