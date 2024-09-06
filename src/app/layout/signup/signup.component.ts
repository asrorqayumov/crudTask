import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { passwordMatchValidator } from '../../auth/passwordValidator/password.validator';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    RouterLink,
    ReactiveFormsModule,
    MatError,
    FormsModule,
    TranslateModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent  implements OnInit{
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(3)]],
        password_confirmation: [
          '',
          [Validators.required, Validators.minLength(3)],
        ],
      },
      { validators: passwordMatchValidator() }
    );
  }

  onSubmit(): void {
    this.authService.signup(this.form.value).subscribe((res) => {
      if (res.message.includes('successfully')) {
        this.router.navigateByUrl('login')
      }
    });
  }
}
