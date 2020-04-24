import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegPage } from './reg.page';

describe('RegPage', () => {
  let component: RegPage;
  let fixture: ComponentFixture<RegPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
