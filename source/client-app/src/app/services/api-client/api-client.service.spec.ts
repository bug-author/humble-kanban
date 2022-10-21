import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ApiClientService } from './api-client.service';

class HttpClientMock {
  public get() {}
  public post() {}
  public put() {}
  public delete() {}
}

describe('ApiClientService', () => {
  let service: ApiClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useClass: HttpClientMock }],
    });
    service = TestBed.inject(ApiClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
