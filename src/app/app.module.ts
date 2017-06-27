import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { JokeComponent } from './joke/joke.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { JokeService } from './joke/joke.service';
import { UserService } from './user.service';

@NgModule({
  declarations: [AppComponent, JokeComponent, WelcomeComponent],
  imports: [BrowserModule],
  providers: [JokeService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
