import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StakeCountComponent } from './stake-count.component';

describe('StakeCountComponent', () => {
  let component: StakeCountComponent;
  let fixture: ComponentFixture<StakeCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StakeCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StakeCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
