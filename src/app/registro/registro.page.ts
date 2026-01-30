import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { RegistroService } from '../services/registro-service';
import { addIcons } from 'ionicons';
import { sunny, moon, code, logIn } from 'ionicons/icons';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { StorageService } from '../services/storage-service';

register();

addIcons({
  'sunny': sunny,
  'moon': moon,
  'code': code,
  'log-in': logIn
});

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RegistroPage implements OnInit {

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

  registroForm: FormGroup;
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
    ],
    nombre: [
      { type: 'required', message: 'El nombre es obligatorio.' }
    ],
    apellido: [
      { type: 'required', message: 'El apellido es obligatorio.' }
    ]
  };

  constructor(private formBuilder: FormBuilder, 
    private navCtrl: NavController, 
    private registroService: RegistroService, 
    private storageService: StorageService, 
    private toastController: ToastController) 
    {

    this.registroForm = this.formBuilder.group({
      email: new FormControl
        ('', Validators.compose([
          Validators.required,
          Validators.email
        ])),
      password: new FormControl
        ('', Validators.compose([
          Validators.required,
          Validators.minLength(6)
        ])),
      nombre: new FormControl
        ('', Validators.compose([
          Validators.required,
        ])),
      apellido: new FormControl
        ('', Validators.compose([
          Validators.required,
        ])),
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

  // async cargarIconoGuardado() {
  //   const iconoGuardado = await this.storageService.get('tema');
  //   if (iconoGuardado) {
  //     this.iconoActual = iconoGuardado;
  //   }
  // }

  get iconoActual() {
    return this.isDay ? 'sunny' : 'moon';
  }


  async ngOnInit() {
    await this.cargarTemaGuardado();
  }



  RegistrarUser(datos: any) {
    console.log('Registro attempt with data:', datos);

    this.registroService.registrarUsuario(datos)
      .then((res) => {
        this.errorMessage = '';

        this.showToast(
          '🎉 Registro exitoso. Ya puedes iniciar sesión',
          'success',
          'person-add'
        );

        this.registroForm.reset();

        setTimeout(() => {
          this.navCtrl.navigateForward('/login');
        }, 1200);
      })
      .catch((err) => {

        this.showToast(
          '❌ Error al registrar usuario. Intenta nuevamente',
          'danger',
          'alert-circle'
        );

        this.errorMessage = 'Error en el registro';
      });
  }


  async goLogin() {
    this.navCtrl.navigateForward('/login');
    this.cargarTemaGuardado();
    console.log('Regresando al login...');
  }

  getEmailError(): string {
    const email = this.registroForm.get('email');

    if (email?.hasError('required')) {
      return 'El correo es obligatorio';
    }

    if (email?.hasError('email')) {
      return 'El correo electrónico no es válido';
    }

    return '';

  }

  getPasswordError(): string {
    const password = this.registroForm.get('password');

    if (password?.hasError('required')) {
      return 'La contraseña es obligatoria';
    }

    if (password?.hasError('minlength')) {
      return 'Debe tener al menos 6 caracteres';
    }

    return '';
  }

  getNombreError(): string {
    const nombre = this.registroForm.get('nombre');

    if (nombre?.hasError('required')) {
      return 'El nombre es obligatorio';
    }

    return '';
  }

  getApellidoError(): string {
    const apellido = this.registroForm.get('apellido');

    if (apellido?.hasError('required')) {
      return 'El apellido es obligatorio';
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
