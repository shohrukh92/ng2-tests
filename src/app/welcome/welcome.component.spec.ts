import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed} from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';
import { UserService } from '../user.service';
import { By } from '@angular/platform-browser';

describe('Welcome Component', () => {
  let comp: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let userServiceStub: UserService;
  let userService: UserService;

  beforeEach(async(() => {
    userServiceStub = {
      isLoggedIn: true,
      user: { name: 'Test User'}
    };

    TestBed.configureTestingModule({
      declarations: [ WelcomeComponent ], // declare the test component
      providers: [ {provide: UserService, useValue: userServiceStub} ]
    })
      .compileComponents();  // compile template and css
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    comp = fixture.componentInstance;
    // userService = TestBed.get(UserService);
    userService = fixture.debugElement.injector.get(UserService);


    de = fixture.debugElement.query(By.css('.welcome'));
    el = de.nativeElement;
  });

  it('stub object and injected UserService should not be the same', () => {
    expect(userServiceStub === userService).toBe(false);

    // Changing the stub object has no effect on the injected service
    userServiceStub.isLoggedIn = false;
    expect(userService.isLoggedIn).toBe(true);
  });

  it('should welcome the user', () => {
    fixture.detectChanges();
    const content = el.textContent;
    expect(content).toContain('Welcome', '"Welcome ..."');
    expect(content).toContain('Test User', 'expected name');
  });

  it('should welcome "Bubba"', () => {
    userService.user.name = 'Bubba'; // welcome message hasn't been shown yet
    fixture.detectChanges();
    expect(el.textContent).toContain('Bubba');
  });

  it('should request login if not logged in', () => {
    userService.isLoggedIn = false; // welcome message hasn't been shown yet
    fixture.detectChanges();
    const content = el.textContent;
    expect(content).not.toContain('Welcome', 'not welcomed');
    expect(content).toMatch(/log in/i, '"log in"');
  });
});
