import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStateComponent } from './view-state.component';

describe('ViewStateComponent', () => {
  let component: ViewStateComponent;
  let fixture: ComponentFixture<ViewStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewStateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
