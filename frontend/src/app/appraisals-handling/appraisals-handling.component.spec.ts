import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalsHandlingComponent } from './appraisals-handling.component';

describe('AppraisalsHandlingComponent', () => {
  let component: AppraisalsHandlingComponent;
  let fixture: ComponentFixture<AppraisalsHandlingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppraisalsHandlingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppraisalsHandlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
