import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  imports: [MatButton, RouterOutlet, RouterLink],
  selector: 'app-backoffice-page',
  styleUrl: './backoffice-page.css',
  templateUrl: './backoffice-page.html',
})
export class BackofficePage {}
