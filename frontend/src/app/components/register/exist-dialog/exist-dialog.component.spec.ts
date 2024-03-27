import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistDialogComponent } from './exist-dialog.component';

describe('ExistDialogComponent', () => {
  let component: ExistDialogComponent;
  let fixture: ComponentFixture<ExistDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExistDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExistDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
