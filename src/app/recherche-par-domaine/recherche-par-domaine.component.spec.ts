import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheParDomaineComponent } from './recherche-par-domaine.component';

describe('RechercheParDomaineComponent', () => {
  let component: RechercheParDomaineComponent;
  let fixture: ComponentFixture<RechercheParDomaineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RechercheParDomaineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechercheParDomaineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
