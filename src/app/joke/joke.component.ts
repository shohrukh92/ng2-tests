import { Component, OnInit } from '@angular/core';
import { JokeService } from './joke.service';

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html'
})
export class JokeComponent implements OnInit {
  joke = '';
  title = 'List of Jokes';

  constructor(private jokeService: JokeService) { }

  ngOnInit() {
    console.log('ngOnInit');
    this.getJoke();
  }

  nextJoke() {
    this.getJoke();
  }

  getJoke() {
    this.jokeService.getJoke()
      .subscribe(joke => this.joke = joke);
  }
}
