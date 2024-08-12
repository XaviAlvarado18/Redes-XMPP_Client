import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWorkareaComponent } from './view-workarea.component';

describe('ViewWorkareaComponent', () => {
  let component: ViewWorkareaComponent;
  let fixture: ComponentFixture<ViewWorkareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewWorkareaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewWorkareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
