import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

//Recibe un heroe (por input) y devuelve y muestra sus detalles

export class HeroDetailComponent implements OnInit {
  // Añade la variable hero para leerla desde el html
  @Input() hero?: Hero;

  // ActivatedRoute guarda información de la ruta de esta instancia del HeroDetailComponent. Intenta obtener la id del héroe
  // HeroService recibe los datos del heroe a partir de la id
  // Location : permite navegar a la anterior vista
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }
  goBack(): void {
    this.location.back();
  }

  // Subscribe: Se usa en peticiones web, CUANDO se actualice el recurso
  // entonces se invoca el método de dentro (go back)

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }

}
