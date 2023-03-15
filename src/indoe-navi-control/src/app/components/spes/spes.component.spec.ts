import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpesComponent } from './spes.component';

describe('SpesComponent', () => {
  let component: SpesComponent;
  let fixture: ComponentFixture<SpesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
