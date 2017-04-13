import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WrGraphPageComponent } from './wr-graph-page.component';

describe('WrGraphPageComponent', () => {
  let component: WrGraphPageComponent;
  let fixture: ComponentFixture<WrGraphPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrGraphPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrGraphPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
