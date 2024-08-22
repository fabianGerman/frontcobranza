import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoimporteComponent } from './empleadoimporte.component';

describe('EmpleadoimporteComponent', () => {
  let component: EmpleadoimporteComponent;
  let fixture: ComponentFixture<EmpleadoimporteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpleadoimporteComponent]
    });
    fixture = TestBed.createComponent(EmpleadoimporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
