import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-account-screen',
  imports: [IonicModule, RouterLink],
  templateUrl: './account-screen.html',
  styleUrl: './account-screen.scss',
})
export class AccountScreen {}
