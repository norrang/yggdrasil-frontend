import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  imports: [MatButton, RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-backoffice-page',
  styleUrl: './backoffice-page.css',
  templateUrl: './backoffice-page.html',
})
export class BackofficePage {}
