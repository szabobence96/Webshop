import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManFragrancesComponent } from './man-fragrances.component';

describe('ManFragrancesComponent', () => {
  let component: ManFragrancesComponent;
  let fixture: ComponentFixture<ManFragrancesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManFragrancesComponent]
    });
    fixture = TestBed.createComponent(ManFragrancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
