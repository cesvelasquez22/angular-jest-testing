import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FatherComponent } from '../../../src/app/basic/father/father.component';
import { FatherSonComponent } from '../../../src/app/basic/father-son/father-son.component';
import { By } from '@angular/platform-browser';

describe('FatherComponent', () => {
  let component: FatherComponent;
  let fixture: ComponentFixture<FatherComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FatherComponent, FatherSonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

 test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should match with snapshot', () => {
    expect(compiled).toMatchSnapshot();
  });

  test('should set client with onSetClient method', () => {
    component.onSetClient('Cesar');
    fixture.detectChanges();

    const codeDivParent = compiled.querySelector('.mt-2');
    expect(codeDivParent?.textContent).toContain('"name"');
    expect(codeDivParent?.textContent).toContain('"Cesar"');
  });

  test('should delete client if father son emit onDeleteClient event', () => {
    component.client = { id: 1, name: 'Cesar' };
    fixture.detectChanges();

    const sonDebugElement = fixture.debugElement.query(By.directive(FatherSonComponent));
    const sonComponent: FatherSonComponent = sonDebugElement.componentInstance;
    
    sonComponent.onDeleteClient.emit();
    expect(component.client).toBe(undefined);
  });

  test('should update client if father son emit onClientUpdated event', () => {
    component.client = { id: 1, name: 'Cesar' };
    fixture.detectChanges();

    const sonDebugElement = fixture.debugElement.query(By.directive(FatherSonComponent));
    const sonComponent: FatherSonComponent = sonDebugElement.componentInstance;
    
    // sonComponent.onChange(10); Another possible method that emits the event
    sonComponent.onClientUpdated.emit({ id: 10, name: 'Pedro' });
    expect(component.client).toEqual({ id: 10, name: 'Pedro' });
  });
});
