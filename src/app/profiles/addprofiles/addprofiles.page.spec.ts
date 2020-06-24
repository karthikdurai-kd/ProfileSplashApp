import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddprofilesPage } from './addprofiles.page';

describe('AddprofilesPage', () => {
  let component: AddprofilesPage;
  let fixture: ComponentFixture<AddprofilesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddprofilesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddprofilesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
