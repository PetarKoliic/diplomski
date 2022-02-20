import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraiserMenuComponent } from './appraiser-menu.component';

describe('AppraiserMenuComponent', () => {
  let component: AppraiserMenuComponent;
  let fixture: ComponentFixture<AppraiserMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppraiserMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppraiserMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
