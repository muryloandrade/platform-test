import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

export class LoginComponent {
  constructor(private httpClient: HttpClient) {}
  login() {
    var email = (document.getElementById('emailInput') as HTMLInputElement)?.value;
    var senha = (document.getElementById('senhaInput') as HTMLInputElement)?.value;
    const endpointUrl = 'https://jsonplaceholder.typicode.com/users';

    this.httpClient.get(endpointUrl,{
      params: {
        email: email,
        senha: senha
      }
    }).subscribe(
      (data) => {
        console.log(data);
        window.location.href = '/map';
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
