import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinlotComponent } from './winlot.component';

describe('WinlotComponent', () => {
  let component: WinlotComponent;
  let fixture: ComponentFixture<WinlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
