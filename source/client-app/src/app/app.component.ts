import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

export interface TestObject {
  message: string;
}

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public test = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<TestObject>('http://127.0.0.1:8000/')
      .pipe(untilDestroyed(this))
      .subscribe((data) => {
        this.test = data.message;
      });
  }
}
