import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOpenedTasksComponent } from './my-opened-tasks.component';

describe('MyOpenedTasksComponent', () => {
  let component: MyOpenedTasksComponent;
  let fixture: ComponentFixture<MyOpenedTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyOpenedTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOpenedTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
