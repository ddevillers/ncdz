import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortailCrudRowComponent } from './portail-crud-row.component';

describe('PortailCrudRowComponent', () => {
  let component: PortailCrudRowComponent;
  let fixture: ComponentFixture<PortailCrudRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortailCrudRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortailCrudRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
