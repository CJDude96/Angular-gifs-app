import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyimageComponent } from './lazyimage.component';

describe('LazyimageComponent', () => {
  let component: LazyimageComponent;
  let fixture: ComponentFixture<LazyimageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LazyimageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LazyimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
