import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroViewerComponent } from './libro-viewer.component';

describe('LibroViewerComponent', () => {
  let component: LibroViewerComponent;
  let fixture: ComponentFixture<LibroViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibroViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibroViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
