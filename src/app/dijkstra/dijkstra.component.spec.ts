import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DijkstraComponent } from './dijkstra.component';

describe('DijkstraComponent', () => {
  let component: DijkstraComponent;
  let fixture: ComponentFixture<DijkstraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DijkstraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DijkstraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
