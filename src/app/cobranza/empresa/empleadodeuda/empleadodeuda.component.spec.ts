import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadodeudaComponent } from './empleadodeuda.component';

describe('EmpleadodeudaComponent', () => {
  let component: EmpleadodeudaComponent;
  let fixture: ComponentFixture<EmpleadodeudaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpleadodeudaComponent]
    });
    fixture = TestBed.createComponent(EmpleadodeudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
