import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBlockedMenuComponent } from './user-blocked-menu.component';

describe('UserBlockedMenuComponent', () => {
  let component: UserBlockedMenuComponent;
  let fixture: ComponentFixture<UserBlockedMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBlockedMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBlockedMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
