import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadMessagesComponent } from './read-messages.component';

describe('ReadMessagesComponent', () => {
  let component: ReadMessagesComponent;
  let fixture: ComponentFixture<ReadMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadMessagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
