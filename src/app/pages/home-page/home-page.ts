import { Component } from '@angular/core';
import { MatFormField, MatHint, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/list';
import { RouterLink } from '@angular/router';

@Component({
  imports: [MatFormField, MatInput, MatLabel, MatButton, MatHint, MatDivider, RouterLink],
  selector: 'app-home-page',
  styleUrl: './home-page.css',
  templateUrl: './home-page.html',
})
export class HomePage {}
