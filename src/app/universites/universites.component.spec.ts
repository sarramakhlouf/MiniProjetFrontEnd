import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversitesComponent } from './universites.component';

describe('UniversitesComponent', () => {
  let component: UniversitesComponent;
  let fixture: ComponentFixture<UniversitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniversitesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniversitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
