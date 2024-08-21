import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewChatsComponent } from './modal-new-chats.component';

describe('ModalNewChatsComponent', () => {
  let component: ModalNewChatsComponent;
  let fixture: ComponentFixture<ModalNewChatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalNewChatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalNewChatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
