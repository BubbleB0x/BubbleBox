import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BtDashComponent } from './bt-dash.component';

describe('BtDashComponent', () => {
  let component: BtDashComponent;
  let fixture: ComponentFixture<BtDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtDashComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BtDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
