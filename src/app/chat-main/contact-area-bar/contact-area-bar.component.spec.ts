import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAreaBarComponent } from './contact-area-bar.component';

describe('ContactAreaBarComponent', () => {
  let component: ContactAreaBarComponent;
  let fixture: ComponentFixture<ContactAreaBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactAreaBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactAreaBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
