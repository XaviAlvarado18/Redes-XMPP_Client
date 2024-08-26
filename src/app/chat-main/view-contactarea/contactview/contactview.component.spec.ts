import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactviewComponent } from './contactview.component';

describe('ContactviewComponent', () => {
  let component: ContactviewComponent;
  let fixture: ComponentFixture<ContactviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
