import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsAppraisalComponent } from './statistics-appraisal.component';

describe('StatisticsAppraisalComponent', () => {
  let component: StatisticsAppraisalComponent;
  let fixture: ComponentFixture<StatisticsAppraisalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsAppraisalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsAppraisalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
