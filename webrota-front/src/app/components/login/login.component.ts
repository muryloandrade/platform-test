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
    var endpointUrl = `http://localhost:5000/authenticate?user=${email}&password=${senha}`;

    this.httpClient.get(endpointUrl).subscribe(
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
