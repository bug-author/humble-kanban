import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

export interface TestObject {
  body: string;
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
      .get<TestObject>('https://jsonplaceholder.typicode.com/posts/1')
      .pipe(untilDestroyed(this))
      .subscribe((data) => {
        this.test =
          data.body ===
          'sunt aut facere repellat provident occaecati excepturi optio reprehenderit'
            ? 'success'
            : 'fail';
      });
  }
}
