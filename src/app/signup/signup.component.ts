import { Component } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup.component',
  templateUrl: 'signup.template.html',
})

export class SignUpComponent {
  data: any = { login: '', password: '' };

  constructor(
    private af: AngularFireAuth,
    private router: Router,
  ) { }

  signIn(): void {
    this.af.auth.signInWithEmailAndPassword(this.data.login, this.data.password)
      .then(res => this.router.navigate(['/dashboard']))
      .catch(err => console.log(err));
  }

  signOut(): void {
    this.af.auth.signOut();
  }

}
