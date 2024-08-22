import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalafiliadoComponent } from './modalafiliado.component';

describe('ModalafiliadoComponent', () => {
  let component: ModalafiliadoComponent;
  let fixture: ComponentFixture<ModalafiliadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalafiliadoComponent]
    });
    fixture = TestBed.createComponent(ModalafiliadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
