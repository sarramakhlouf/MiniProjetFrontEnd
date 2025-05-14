import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Universite } from '../model/Universite.model';
import { Domaine } from '../model/Domaine.model';
import { AuthService } from '../services/auth.service';
import { UniversiteService } from '../services/universite.service';

@Component({
  selector: 'app-recherche-par-domaine',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './recherche-par-domaine.component.html',
})
export class RechercheParDomaineComponent implements OnInit {
  universites!: Universite[];
  IdDomaine!: number;
  domaines!: Domaine[];

  constructor(
    private universiteService: UniversiteService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.universiteService.listeDomaines().subscribe((dom) => {
      this.domaines = dom._embedded.domaines;
    });
  }

  onChange() {
    const domaineId = Number(this.IdDomaine);
    this.universiteService.rechercherParDomaine(domaineId).subscribe((uni) => {
      this.universites = uni;
    });
  }

  supprimerUniversity(uni: Universite) {
    let conf = confirm('Etes-vous sûr ?');
    if (conf) {
      this.universiteService.supprimerUniversite(uni.idUni!).subscribe(() => {
        this.universites = this.universites.filter(
          (c) => c.idUni !== uni.idUni
        );
        console.log('université supprimée');
      });
    }
  }
}
