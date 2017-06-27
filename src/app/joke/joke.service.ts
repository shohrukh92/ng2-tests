import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class JokeService {
  getJoke() {
    return Observable.of('Joke number one... ' + Math.random());
  }
}