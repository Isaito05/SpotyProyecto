import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth-service';
import { StorageService } from '../services/storage-service';
import { addIcons } from 'ionicons';
import { sunny, moon, code, personAdd } from 'ionicons/icons';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';

register();

addIcons({
  'sunny': sunny,
  'moon': moon,
  'code': code,
  'person-add': personAdd
});
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginPage implements OnInit {

  colorSlideClaro = "var(--color-claro-fondo-slide)";
  colorSlideOscuro = "var(--color-oscuro-fondo-slide)";
  colorLetrasClarasSlide = "var(--color-letras-claras-slide)";
  colorLetrasOscuroSlide = "var(--color-letras-oscuras-slide)";
  colorTituloClarasSlide = "var(--color-titulo-claras-slide)";
  colorTituloOscuroSlide = "var(--color-titulo-oscuras-slide)";
  colorEncabezadoClaras = "var(--color-encabe-claras-slide)";
  colorEncabezadoOscuro = "var(--color-encabe-oscuras-slide)";

  modoOscuro = true;

  colorSlideActual = this.colorSlideOscuro;
  colorLetrasActualSlide = this.colorLetrasClarasSlide;
  colorTituloActualSlide = this.colorTituloClarasSlide;
  colorEncabezadoActual = this.colorEncabezadoClaras;

  loginForm: FormGroup;
  errorMessage: string = '';
  isDay: boolean = true;

  validationMessages = {
    email: [
      { type: 'required', message: 'El correo electrónico es obligatorio.' },
      { type: 'email', message: 'El correo electrónico no es válido.' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria.' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 6 caracteres.' }
    ]
  };

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private navCtrl: NavController, private storageService: StorageService, private toastController: ToastController) {

    this.loginForm = this.formBuilder.group({
      email: new FormControl
        ('', Validators.compose([
          Validators.required,
          Validators.email
        ])
        ),
      password: new FormControl
        ('', Validators.compose([
          Validators.required,
          Validators.minLength(6)
        ])
        ),
    });

  }

  async cambiarColorSlide() {
    this.modoOscuro = !this.modoOscuro;

    this.aplicarTema(this.modoOscuro);

    await this.storageService.set('tema', {
      modoOscuro: this.modoOscuro
    });

    console.log('Tema guardado:', this.modoOscuro);
  }

  aplicarTema(esOscuro: boolean) {
    this.modoOscuro = esOscuro;

    this.colorSlideActual = esOscuro
      ? this.colorSlideOscuro
      : this.colorSlideClaro;

    this.colorLetrasActualSlide = esOscuro
      ? this.colorLetrasClarasSlide
      : this.colorLetrasOscuroSlide;

    this.colorTituloActualSlide = esOscuro
      ? this.colorTituloClarasSlide
      : this.colorTituloOscuroSlide;

    this.colorEncabezadoActual = esOscuro
      ? this.colorEncabezadoClaras
      : this.colorEncabezadoOscuro;

    // 🔥 ESTO ES LO QUE TE FALTABA
    this.isDay = esOscuro;
  }

  async cargarTemaGuardado() {
    const temaGuardado = await this.storageService.get('tema');

    if (temaGuardado && typeof temaGuardado.modoOscuro === 'boolean') {
      this.aplicarTema(temaGuardado.modoOscuro);
    } else {
      // tema por defecto
      this.aplicarTema(true);
    }
  }

  get iconoActual() {
    return this.isDay ? 'sunny' : 'moon';
  }

  async ngOnInit() {
    await this.cargarTemaGuardado();
  }


  loginUser(credentials: any) {
    console.log('Login attempt with credentials:', credentials);

    this.authService.loginUser(credentials)
      .then((res) => {
        this.errorMessage = '';

        // ✅ Mensaje bonito de éxito
        this.showToast(
          '¡Bienvenido! Sesión iniciada correctamente 👋',
          'success',
          'checkmark-circle'
        );

        this.navCtrl.navigateForward('/menu/home');
      })
      .catch((err) => {

        // ❌ Mensaje bonito de error
        this.showToast(
          'Correo o contraseña incorrectos 😕',
          'danger',
          'close-circle'
        );

        this.errorMessage = 'Credenciales inválidas';
      });
  }


  async goRegistro() {
    this.navCtrl.navigateForward('/registro');
    this.cargarTemaGuardado();
    console.log('Navegando a registro...');
  }

  getEmailError(): string {
    const email = this.loginForm.get('email');

    if (email?.hasError('required')) {
      return 'El correo es obligatorio';
    }

    if (email?.hasError('email')) {
      return 'El correo electrónico no es válido';
    }

    return '';

  }

  getPasswordError(): string {
    const password = this.loginForm.get('password');

    if (password?.hasError('required')) {
      return 'La contraseña es obligatoria';
    }

    if (password?.hasError('minlength')) {
      return 'Debe tener al menos 6 caracteres';
    }

    return '';
  }

  async showToast(message: string, color: string = 'success', icon: string = 'checkmark-circle') {
    const toast = await this.toastController.create({
      message,
      duration: 2500,
      position: 'bottom',
      color,
      icon,
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ]
    });
    await toast.present();
  }

}
