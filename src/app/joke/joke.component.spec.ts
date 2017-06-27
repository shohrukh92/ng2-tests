import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TestBed, ComponentFixture, fakeAsync, async, tick } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { JokeComponent } from './joke.component';
import { JokeService } from './joke.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

describe('Comp: Joke Comp', () => {
  let component: JokeComponent;
  let fixture: ComponentFixture<JokeComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  let jokeService: JokeService;
  let spy: any;
  let testJoke = 'FAKE JOKE';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [JokeComponent],
      providers: [JokeService]
    });

    fixture = TestBed.createComponent(JokeComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    el = de.query(By.css('p')).nativeElement;
    jokeService = TestBed.get(JokeService);
    spy = spyOn(jokeService, 'getJoke')
      .and.returnValue(Observable.of(testJoke).delay(1));
  });

  it('should not show quote before OnInit', () => {
    expect(el.textContent).toBe('', 'nothing displayed');
    expect(spy.calls.any()).toBe(false, 'getQuote not yet called');
  });

  it('should still not show quote after component initialized', () => {
    fixture.detectChanges();
    // getQuote service is async => still has not returned with quote
    expect(el.textContent).toBe('', 'no quote yet');
    expect(spy.calls.any()).toBe(true, 'getQuote called');
  });

  it('should show quote after getQuote promise (async)', async(() => {
    fixture.detectChanges();

    fixture.whenStable().then(() => { // wait for async getQuote
      fixture.detectChanges();        // update view with quote
      expect(el.textContent).toBe(testJoke);
    });
  }));

  it('should show quote after getQuote promise (fakeAsync)', fakeAsync(() => {
    fixture.detectChanges();
    tick(2);                  // wait for async getQuote
    fixture.detectChanges(); // update view with quote
    expect(el.textContent).toBe(testJoke);
  }));

  xit('should create', () => {
    spyOn(component, 'ngOnInit');
    component.ngOnInit();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });



  xit('should spy ngOnInit', () => {
    spyOn(component, 'ngOnInit').and.callThrough();
    fixture.detectChanges();
    expect(component.ngOnInit).toHaveBeenCalled();
  });

  xit('should add 1 + 1', () => {
    expect(1+1).toEqual(2);
  });

  xit('should have a title of...', () => {
    expect(component.title).toEqual('List of Jokes');
  });

  xit('should set joke on Init', () => {
    spyOn(jokeService, 'getJoke')
      .and.returnValue(Observable.of('FAKE JOKE'))

    fixture.detectChanges();

    const el = de.query(By.css('p')).nativeElement;

    expect(el.textContent).toEqual('FAKE JOKE');
  });

  xit('should show a new joke', fakeAsync(() => {
    spyOn(jokeService, 'getJoke')
      .and.returnValues(
        Observable.of('FAKE JOKE'),
        Observable.of('FAKE JOKE 2').timeout(2000)
      );

    fixture.detectChanges();

    const el = de.query(By.css('p')).nativeElement;

    expect(el.textContent).toEqual('FAKE JOKE');

    const button = de.query(By.css('button')).nativeElement;
    button.click();
    tick(3000);
    fixture.detectChanges();
    expect(el.textContent).toEqual('FAKE JOKE 2');
  }));

  xit('should2 show a new joke', async(() => {
    spyOn(jokeService, 'getJoke')
      .and.returnValues(
        Observable.of('FAKE JOKE'),
        Observable.of('FAKE JOKE 2').timeout(2000)
      );

    fixture.detectChanges();

    const el = de.query(By.css('p')).nativeElement;

    expect(el.textContent).toEqual('FAKE JOKE');

    const button = de.query(By.css('button')).nativeElement;
    button.click();
    // tick(3000);
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(el.textContent).toEqual('FAKE JOKE 2');
    });
  }));
});
