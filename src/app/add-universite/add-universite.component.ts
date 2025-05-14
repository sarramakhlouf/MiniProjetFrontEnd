import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';


import { Domaine } from '../model/Domaine.model';
import { Universite } from '../model/Universite.model';
import { UniversiteService } from '../services/universite.service';

@Component({
  selector: 'app-add-universite',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-universite.component.html',
  styleUrls: ['./add-universite.component.css']
})
export class AddUniversiteComponent implements OnInit {
  newUni = new Universite(); 
  domaines!: Domaine[];
  newIdDom!: number;
  updatedDomId!: number;

  constructor(
    private universiteService: UniversiteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.universiteService.listeDomaines().subscribe(doms => {
      console.log(doms);
      this.domaines = doms._embedded.domaines; 
    });
  }

  addUniversity() {
    this.newUni.domaine = this.domaines.find(dom => dom.idDom === +this.newIdDom)!;
    console.log(this.newUni);
    this.universiteService.ajouterUniversite(this.newUni).subscribe(uni => {
      console.log(uni);
      this.router.navigate(['universities']);
    });  
  }
}
