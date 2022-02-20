import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraiserChangeMindComponent } from './appraiser-change-mind.component';

describe('AppraiserChangeMindComponent', () => {
  let component: AppraiserChangeMindComponent;
  let fixture: ComponentFixture<AppraiserChangeMindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppraiserChangeMindComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppraiserChangeMindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
