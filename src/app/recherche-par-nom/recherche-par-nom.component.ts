import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UniversiteService } from '../services/universite.service';
import { Universite } from '../model/Universite.model';
import { AuthService } from '../services/auth.service';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-recherche-par-nom',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './recherche-par-nom.component.html',
  styleUrls: ['./recherche-par-nom.component.css']
})
export class RechercheParNomComponent implements OnInit {
  universites: Universite[] = [];
  allUniversites: Universite[] = [];
  nomUniversite: string = '';
  searchTerm: string = '';

  constructor(
    private universiteService: UniversiteService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.universiteService.listeUniversities().subscribe({
      next: (data) => {
        this.universites = data;
        this.allUniversites = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des universités :', err);
      },
    });
  }

  rechercherUnis(): void {
    this.universiteService.rechercherParNom(this.nomUniversite).subscribe({
      next: (unis) => {
        this.universites = unis;
        console.log(unis);
      },
      error: (err) => {
        console.error("Erreur lors de la recherche :", err);
      }
    });
  }

  onKeyUp(filterText: string): void {
    this.universites = this.allUniversites.filter((item) =>
      item.nomUni?.toLowerCase().includes(filterText.toLowerCase())
    );
  }
}
