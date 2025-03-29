import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedPageComponent } from './added-page.component';

describe('AddedPageComponent', () => {
  let component: AddedPageComponent;
  let fixture: ComponentFixture<AddedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddedPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
