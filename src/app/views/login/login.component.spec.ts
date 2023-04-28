import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let comp: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [BrowserModule, FormsModule, ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(LoginComponent);
        fixture.detectChanges();
        comp = fixture.componentInstance; // LoginComponent test instance
        // query for the title <h1> by CSS element selector
        de = fixture.debugElement.query(By.css('form'));
        el = de.nativeElement;
      });
  }));

  it(`should have as text 'Login page'`, async(() => {
    expect(comp.title).toEqual('Login page');
  }));

  it(`should set submitted to true`, async(() => {
    comp.onSubmit();
    expect(comp.submitted).toBeTruthy();
  }));

  it(`should call the onSubmit method`, async(() => {
    spyOn(comp, 'onSubmit');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(comp.onSubmit).toHaveBeenCalled();
  }));

  it(`form should be invalid`, async(() => {
    comp.loginForm.controls['username'].setValue('');
    comp.loginForm.controls['password'].setValue('');

    expect(comp.loginForm.valid).toBeFalsy();
  }));

  it(`form should be valid`, async(() => {
    let value = 'admin' || 'user';
    comp.loginForm.controls['username'].setValue(value);
    comp.loginForm.controls['password'].setValue(value);
    expect(comp.loginForm.valid).toBeTruthy();
  }));
});
