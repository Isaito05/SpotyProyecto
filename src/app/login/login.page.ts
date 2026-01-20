import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

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

  constructor(private formBuilder: FormBuilder) {

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

  ngOnInit() {
  }

  loginUser(credentials: any) {
    console.log('Login attempt with credentials:', credentials);
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
}
