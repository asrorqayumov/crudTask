import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('password_confirmation');
    
  
    if (!password || !confirmPassword) {
      return null; 
    }

    
    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordsMismatch: true });
    } else {
      confirmPassword.setErrors(null); 
    }

    return null; 
  };
}
