import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuestionarioViewerComponent } from './cuestionario-viewer.component';

describe('CuestionarioViewerComponent', () => {
  let component: CuestionarioViewerComponent;
  let fixture: ComponentFixture<CuestionarioViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuestionarioViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuestionarioViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
