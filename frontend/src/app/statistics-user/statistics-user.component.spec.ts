import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsUserComponent } from './statistics-user.component';

describe('StatisticsUserComponent', () => {
  let component: StatisticsUserComponent;
  let fixture: ComponentFixture<StatisticsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
