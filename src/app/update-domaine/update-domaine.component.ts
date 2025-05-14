import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Domaine } from '../model/Domaine.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-update-domaine',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-domaine.component.html',
  styleUrls: ['./update-domaine.component.css'] 
})
export class UpdateDomaineComponent {
  @Input() domaine!: Domaine;
  @Input() ajout!: boolean;
  @Output() domaineUpdated = new EventEmitter<Domaine>();

  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateDomaine", this.domaine);
  }

  saveDomaine(): void {
    this.domaineUpdated.emit(this.domaine);
  }
}
