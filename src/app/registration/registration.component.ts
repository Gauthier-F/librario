import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators, EmailValidator } from '@angular/forms';
import { UserService } from '../services/user-service/user-service';
import { User } from '../users/user';
import { CustomValidators } from '../validator/custom/custom-validators';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from '../services/login-service/login-service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  pseudo: FormControl;
   minPseudo = 6;
  maxPseudo = 30;
  email: FormControl;
  password: FormControl;
  minPwd = 8;
  maxPwd = 20;
  confirmPwd: FormControl;

  registerForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService, private log: LoginService, private dialog: MatDialog) {
   
    
  }

  /*
  onSubmit() {
    if (this.registerForm.valid) {
      if (this.registerService.log().value !== null) {
        let user = new User(0, this.registerForm.value.pseudo,
          this.registerForm.value.email, this.registerForm.value.password,
          this.registerForm.value.confirmPwd);
        this.openDialogCreate(user);
        this.registerForm.reset();
      }
    }
  }
  */
  ngOnInit() {
    this.pseudo = new FormControl(null, [Validators.required, Validators.minLength(this.minPseudo), Validators.maxLength(this.maxPseudo)]);
    this.email = new FormControl(null, [Validators.required]);
    this.password = new FormControl(null, [Validators.required, Validators.minLength(this.minPwd), Validators.maxLength(this.maxPwd)]);
    this.confirmPwd = new FormControl(null, [Validators.required]);

    this.registerForm = this.fb.group({
      pseudo: this.pseudo,
      email: this.email,
      password: this.password,
      confirmPwd: this.confirmPwd
    }, {
        validators: CustomValidators.matching_password()
      });
  }

  public registration() {
    if (this.registerForm.valid) {
      let user = new User(this.registerForm.value.pseudo, this.registerForm.value.email,
        this.registerForm.value.password);
      this.openDialogValid(user);
    }
  }




  public controlPseudo(): string {
    if (this.pseudo.touched) {
      if (this.pseudo.hasError('required')) {
        return 'Un pseudo est obligatoire';
      } if (this.pseudo.hasError('minLength')) {
        return 'Le pseudo choisit est trop court, il doit contenir au minimum ' + this.minPseudo + ' caractères (actuellement ' + this.pseudo.value.length + ')';
      } if (this.pseudo.hasError('maxLength')) {
        return 'Le pseudo choisit est trop long, il doit contenir au maximum ' + this.maxPseudo + ' caractères (actuellement ' + this.pseudo.value.length + ')';
      }
      return null;
      
    }
  }


  openDialogValid(user: User) {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Bravo !',
        message: `Etes-vous sure de vouloir crée ce compte ?  `, close: true
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.registerForm.reset();
        this.userService.createUser(user).subscribe(() => {
          this.log.login(user.email, user.password).subscribe((data) => {
            if (data !== null) {
              this.log.log().next(data);
              this.router.navigateByUrl('/collection');
            }
          },
            (error) => {
              this.log.log().next(null);
              console.log("error");
            });

        });
      }
    });
  }

  public controlEmail(): string {
    if (this.email.touched) {
      if (this.email.hasError('required')) {
        return `L'adresse email est obligatoire.`;
      }
      if (this.email.hasError('error_mail')) {
        return `L'adresse email n'est pas correcte.`;
      }
    }
    return null;
  }

  public controlPassword(): string {
    if (this.password.touched) {
      if (this.password.hasError('required')) {
        return 'Un mot de passe est obligatoire';
      } if (this.password.hasError('minLength')) {
        return 'Le mot de passe est trop court, il doit contenir minimum ' + this.minPwd + ' (actuellement ' + this.password.value.length + ')';
      } if (this.password.hasError('maxLength')) {
        return 'Le mot de passe est trop long, il doit contenir mimimum ' + this.maxPwd + ' (actuellement ' + this.password.value.length + ')';
      }
    }
    return null;
  }

  public controlConfirmPwd() {
    if (this.confirmPwd.touched) {
      if (this.confirmPwd.hasError('required')) {
        return 'Un mot de passe est obligatoire';
      } if (this.confirmPwd.hasError('minLength')) {
        return 'Le mot de passe est trop court, il doit contenir minimum ' + this.minPwd + ' (actuellement ' + this.confirmPwd.value.length + ')';
      } if (this.confirmPwd.hasError('maxLength')) {
        return 'Le mot de passe est trop long, il doit contenir mimimum ' + this.maxPwd + ' (actuellement ' + this.confirmPwd.value.length + ')';
      }
    }
    return null;
  }

}
