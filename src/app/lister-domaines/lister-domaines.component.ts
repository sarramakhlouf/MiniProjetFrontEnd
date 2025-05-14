import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Domaine } from '../model/Domaine.model';
import { UniversiteService } from '../services/universite.service';
import { UpdateDomaineComponent } from '../update-domaine/update-domaine.component';

@Component({
  selector: 'app-lister-domaines',
  standalone: true,
  imports: [CommonModule, FormsModule, UpdateDomaineComponent], 
  templateUrl: './lister-domaines.component.html',
  styleUrls: ['./lister-domaines.component.css']
})
export class ListerDomainesComponent implements OnInit {
  domaines!: Domaine[];
  updatedDom: Domaine = { idDom: 0, nomDom: '' };
  ajout: boolean = true;

  constructor(private universiteService: UniversiteService) {}

  ngOnInit(): void {
    this.chargerDomaines();
  }

  chargerDomaines(): void {
    this.universiteService.listeDomaines().subscribe({
      next: (data) => {
        this.domaines = data._embedded.domaines;
      },
      error: (err) => {
        console.error("Erreur lors du chargement des domaines :", err);
      },
    });
  }

  domaineUpdated(dom: Domaine): void {
    console.log('domaine reçu du formulaire :', dom);
    this.universiteService.ajouterDomaine(dom).subscribe(() => this.chargerDomaines());
  }

  updateDom(dom: Domaine): void {
    this.updatedDom = { ...dom }; // Crée une copie
    this.ajout = false;
    console.log("dom updated event", dom);
    this.universiteService.updateDomaine(dom).subscribe(() => {
      this.chargerDomaines();
      this.ajout = true; 
      console.log("Domaine mis à jour avec succès");
    });
  }
}
