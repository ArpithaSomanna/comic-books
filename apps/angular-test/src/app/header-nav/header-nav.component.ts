import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'angular-monorepo-header-nav',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css'],
})
export class HeaderNavComponent {
  @Input() headerName!: string;
  @Input() displayArrow!: string;
}
