import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QrDashComponent } from './qr-dash.component';

describe('QrDashComponent', () => {
  let component: QrDashComponent;
  let fixture: ComponentFixture<QrDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrDashComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QrDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
