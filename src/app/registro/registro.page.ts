import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IonicModule, NavController} from '@ionic/angular';
import { RegistroService } from '../services/registro-service';
import { addIcons } from 'ionicons';
import { sunny, moon, code, logIn} from 'ionicons/icons';

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
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class RegistroPage implements OnInit {

  registroForm: FormGroup;
  errorMessage: string = '';

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

  constructor(private formBuilder: FormBuilder, private navCtrl: NavController, private registroService: RegistroService) {
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


  ngOnInit() {
  }

  RegistrarUser(datos: any) {
    console.log('Registro attempt with data:', datos);
    this.registroService.registrarUsuario(datos).then((res) => {
        this.errorMessage = '';
        this.navCtrl.navigateForward('/login');
      }).catch((err) => {
          this.errorMessage = err;
        });
  }

  async goLogin() {
    this.navCtrl.navigateForward('/login');
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


}
