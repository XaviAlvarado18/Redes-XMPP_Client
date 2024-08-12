import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkAreaBarComponent } from './work-area-bar.component';

describe('WorkAreaBarComponent', () => {
  let component: WorkAreaBarComponent;
  let fixture: ComponentFixture<WorkAreaBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkAreaBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkAreaBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
