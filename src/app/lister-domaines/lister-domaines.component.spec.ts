import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerDomainesComponent } from './lister-domaines.component';

describe('ListerDomainesComponent', () => {
  let component: ListerDomainesComponent;
  let fixture: ComponentFixture<ListerDomainesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListerDomainesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListerDomainesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
