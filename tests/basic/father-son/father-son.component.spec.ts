import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FatherSonComponent } from '../../../src/app/basic/father-son/father-son.component';

describe('FatherSonComponent', () => {
  let component: FatherSonComponent;
  let fixture: ComponentFixture<FatherSonComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FatherSonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FatherSonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
    jest.clearAllMocks();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should match with snapshot', () => {
    expect(compiled).toMatchSnapshot();
  });

  test('should do not show buttons if !client', () => {
    const buttons = compiled.querySelectorAll('button');
    expect(buttons.length).toBe(0);
  });

  test('should show buttons if client', () => {
    component.client = { id: 1, name: 'Cesar' };
    fixture.detectChanges();
    const buttons = compiled.querySelectorAll('button');
    expect(buttons.length).toBe(2);
  });

  test('should match with snapshot if client', () => {
    component.client = { id: 1, name: 'Cesar' };
    fixture.detectChanges();
    expect(compiled).toMatchSnapshot();
  });

  test('should emit onDeleteClient with delete button', () => {
    component.client = { id: 1, name: 'Cesar' };
    fixture.detectChanges();

    jest.spyOn(component.onDeleteClient, 'emit');

    const btnDelete = compiled.querySelector('[data-test=btn-delete]');
    btnDelete?.dispatchEvent(new Event('click'));
    expect(component.onDeleteClient.emit).toHaveBeenCalled();
  });

  test('should emit onClientUpdated with "Cambiar ID" button', () => {
    component.client = { id: 1, name: 'Cesar' };
    fixture.detectChanges();

    jest.spyOn(component.onClientUpdated, 'emit');

    const btnChangeId = compiled.querySelector('[data-test=btn-id]');
    btnChangeId?.dispatchEvent(new Event('click'));
    expect(component.onClientUpdated.emit).toHaveBeenCalledWith({
      ...component.client,
      id: 5
    });
  });

  test('should emit with onChange method if client', () => {
    jest.spyOn(component.onClientUpdated, 'emit');
    
    // If doesn't exist client expect not to have been called
    component.onChange(10);
    expect(component.onClientUpdated.emit).not.toHaveBeenCalled();

    component.client = { id: 1, name: 'Cesar' };
    fixture.detectChanges();

    component.onChange(10);
    expect(component.onClientUpdated.emit).toHaveBeenCalledWith({
      ...component.client,
      id: 10
    });
  })
});
