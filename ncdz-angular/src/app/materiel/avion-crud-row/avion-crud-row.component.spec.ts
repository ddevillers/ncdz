import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvionCrudRowComponent } from './avion-crud-row.component';

describe('AvionCrudRowComponent', () => {
  let component: AvionCrudRowComponent;
  let fixture: ComponentFixture<AvionCrudRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvionCrudRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvionCrudRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
