import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Universite } from '../model/Universite.model';
import { Domaine } from '../model/Domaine.model';
import { DomaineWrapper } from '../model/DomaineWrapped.model';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UniversiteService {
  universities !: Universite[];
  domaines!: Domaine[];
  UniversiteRecherche!: Universite[];

  private apiURL: string = 'http://localhost:8090/universities/api';
  private apiURLDom: string = 'http://localhost:8090/universities/dom';

  constructor(private http: HttpClient, private authService: AuthService) { }

  listeUniversities(): Observable<Universite[]> {
    return this.http.get<Universite[]>(this.apiURL + "/all").pipe(
      catchError((err) => {
        console.error('Erreur lors de la récupération des universités', err);
        return of([]);
      })
    );
  }

  ajouterUniversite(uni: Universite): Observable<Universite> {
    return this.http.post<Universite>(this.apiURL + "/adduni", uni);
  }

  supprimerUniversite(id: number) {
    const url = `${this.apiURL}/deluni/${id}`;
    return this.http.delete(url);
  }

  consulterUniversite(id: number): Observable<Universite> {
    const url = `${this.apiURL}/getbyid/${id}`;
    return this.http.get<Universite>(url);
  }

  updateUniversite(uni: Universite): Observable<Universite> {
    return this.http.put<Universite>(this.apiURL + "/updateuni", uni);
  }

  listeDomaines(): Observable<DomaineWrapper> {
    return this.http.get<DomaineWrapper>(this.apiURLDom);
  }

  ajouterDomaine(domaine: Domaine): Observable<Domaine> {
    return this.http.post<Domaine>(this.apiURLDom, domaine, httpOptions);
  }

  consulterDomaine(id: number): Domaine {
    return this.domaines.find(dom => dom.idDom == id)!;
  }

  rechercherParDomaine(idDom: number): Observable<Universite[]> {
    const url = `${this.apiURLDom}/search?domaineId=${idDom}`;
    return this.http.get<Universite[]>(url);
  }

  rechercherParNom(nom: string): Observable<Universite[]> {
    const url = `${this.apiURL}/formsByName/${nom}`;
    return this.http.get<Universite[]>(url);
  }

  updateDomaine(dom: Domaine): Observable<void> {
    const url = `${this.apiURL}/${dom.idDom}`; // Assurez-vous que `id` est une propriété existante
    return this.http.put<void>(url, dom);
  }
  trierUidUni() {
    this.universities = this.universities.sort((n1, n2) => {
      if (n1.idUni! > n2.idUni!) {
        return 1;
      }
      if (n1.idUni! < n2.idUni!) {
        return -1;
      }
      return 0;
    });
  }
}