import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsAppraiserRatingComponent } from './statistics-appraiser-rating.component';

describe('StatisticsAppraiserRatingComponent', () => {
  let component: StatisticsAppraiserRatingComponent;
  let fixture: ComponentFixture<StatisticsAppraiserRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsAppraiserRatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsAppraiserRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
