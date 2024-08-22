import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalaporteComponent } from './modalaporte.component';

describe('ModalaporteComponent', () => {
  let component: ModalaporteComponent;
  let fixture: ComponentFixture<ModalaporteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalaporteComponent]
    });
    fixture = TestBed.createComponent(ModalaporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
