import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ]
})
export class HeroSearchComponent implements OnInit {
  // ! indica que no puede ser null, ? Indica que si puede ser null
  heroes$!: Observable<Hero[]>;
  // Un Subject es una lista obserbable de obserbables, puedes subscribirte a él o a sus elementos
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    // SearchTerms es un Observable que emite un flujo constante de SearchTerms
    // Lee constantemente el input del HTML y emite los resultados al elemento suscrito.
    this.searchTerms.next(term);
  }

  // Como realizar una búsqueda por cada variación en el imput es excesivo, limitaremos las operaciones con estos métodos
  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      // Solo se llama si ha pasado por Debounce y distinct
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }
}
