import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WrGraphComponent } from './wr-graph.component';

describe('WrGraphComponent', () => {
  let component: WrGraphComponent;
  let fixture: ComponentFixture<WrGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
