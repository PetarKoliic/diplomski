import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtForAppraisalComponent } from './art-for-appraisal.component';

describe('ArtForAppraisalComponent', () => {
  let component: ArtForAppraisalComponent;
  let fixture: ComponentFixture<ArtForAppraisalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtForAppraisalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtForAppraisalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
