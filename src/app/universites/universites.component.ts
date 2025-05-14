import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniversiteService } from '../services/universite.service';
import { AuthService } from '../services/auth.service';
import { Universite } from '../model/Universite.model';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-universites',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './universites.component.html',
  styleUrls: ['./universites.component.css']
})
export class UniversitesComponent implements OnInit {
  universites!: Universite[];

  constructor(
    private universiteService: UniversiteService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.chargerUniversites();
  }

  chargerUniversites() {
    this.universiteService.listeUniversities().subscribe(prods => {
      console.log(prods);
      this.universites = prods;
    });
  }

  supprimerUniversite(uni: Universite) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf) {
      this.universiteService.supprimerUniversite(uni.idUni).subscribe(() => {
        console.log("université supprimée");
        this.chargerUniversites();
      });
    }
  }
}
