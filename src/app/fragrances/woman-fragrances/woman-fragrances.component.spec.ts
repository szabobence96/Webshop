import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WomanFragrancesComponent } from './woman-fragrances.component';

describe('WomanFragrancesComponent', () => {
  let component: WomanFragrancesComponent;
  let fixture: ComponentFixture<WomanFragrancesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WomanFragrancesComponent]
    });
    fixture = TestBed.createComponent(WomanFragrancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
