import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentAppraisalsComponent } from './current-appraisals.component';

describe('CurrentAppraisalsComponent', () => {
  let component: CurrentAppraisalsComponent;
  let fixture: ComponentFixture<CurrentAppraisalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentAppraisalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentAppraisalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
