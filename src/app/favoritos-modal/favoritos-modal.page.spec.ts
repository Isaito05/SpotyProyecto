import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritosModalPage } from './favoritos-modal.page';

describe('FavoritosModalPage', () => {
  let component: FavoritosModalPage;
  let fixture: ComponentFixture<FavoritosModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritosModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
