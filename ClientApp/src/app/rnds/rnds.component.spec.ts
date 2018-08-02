import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RndsComponent } from './rnds.component';

describe('RndsComponent', () => {
  let component: RndsComponent;
  let fixture: ComponentFixture<RndsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RndsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RndsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
