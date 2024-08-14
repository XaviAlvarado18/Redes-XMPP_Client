import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewContactareaComponent } from './view-contactarea.component';

describe('ViewContactareaComponent', () => {
  let component: ViewContactareaComponent;
  let fixture: ComponentFixture<ViewContactareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewContactareaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewContactareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
