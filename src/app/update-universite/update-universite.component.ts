import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Domaine } from '../model/Domaine.model';
import { Universite } from '../model/Universite.model';
import { UniversiteService } from '../services/universite.service';

@Component({
  selector: 'app-update-universite',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './update-universite.component.html',
  styles: []
})
export class UpdateUniversiteComponent implements OnInit {
  currentUniversite: Universite | undefined;
  domaines: Domaine[] = [];
  updatedDomId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private universiteService: UniversiteService
  ) {}

  ngOnInit(): void {
    const universityId = Number(this.activatedRoute.snapshot.params['id']);

    if (isNaN(universityId)) {
      console.error("L'ID fourni dans l'URL n'est pas valide.");
      this.router.navigate(['universities']);
      return;
    }

    // Charger la liste des domaines
    this.universiteService.listeDomaines().subscribe({
      next: (doms) => {
        this.domaines = doms._embedded.domaines;
      },
      error: (err) => {
        console.error("Erreur lors du chargement des domaines :", err);
      }
    });

    // Charger l'université à modifier
    this.universiteService.consulterUniversite(universityId).subscribe({
      next: (uni) => {
        this.currentUniversite = uni;
        this.updatedDomId = uni.domaine?.idDom ?? 0;
      },
      error: (err) => {
        console.error("Erreur lors du chargement de l'université :", err);
        this.router.navigate(['universities']);
      }
    });
  }

  updateUniversite(): void {
    if (!this.currentUniversite || !this.updatedDomId) {
      console.error("Les données nécessaires ne sont pas disponibles.");
      return;
    }

    const selectedDomaine = this.domaines.find(dom => dom.idDom === +this.updatedDomId);
    if (!selectedDomaine) {
      console.error("Le domaine sélectionné est introuvable.");
      return;
    }

    this.currentUniversite.domaine = selectedDomaine;

    this.universiteService.updateUniversite(this.currentUniversite).subscribe({
      next: () => {
        console.log("Université mise à jour avec succès.");
        this.router.navigate(['universities']);
      },
      error: (err) => {
        console.error("Erreur lors de la mise à jour de l'université :", err);
      }
    });
  }
}
