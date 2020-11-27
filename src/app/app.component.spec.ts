import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`should have as title 'image-editor'`, () => {
    fixture.detectChanges();
    expect(component.title).toEqual('image-editor');
  });

  it('should call addTextBlock function', () => {
    fixture.detectChanges();
    checkCall('addTextBlock', '#new');
  });

  it('should call zoomIn function', () => {
    fixture.detectChanges();
    checkCall('zoomIn', '#zoom-in');
  });

  it('should call zoomOut function', () => {
    fixture.detectChanges();
    checkCall('zoomOut', '#zoom-out');
  });

  it('should call rotate function', () => {
    fixture.detectChanges();
    checkCall('rotate', '#rotate');
  });

  const checkCall = (methodName: string, selector: string) => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    // @ts-ignore
    spyOn(fixture.componentInstance, methodName).and.stub();
    compiled.querySelector(selector).click();
    fixture.detectChanges();
    // @ts-ignore
    expect(fixture.componentInstance[methodName]).toHaveBeenCalled();
  };
});
