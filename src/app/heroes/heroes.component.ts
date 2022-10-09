import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
// No necesitamos ya el Heroes import, porque tenemos HeroService
// import { HEROES } from '../mock-heroes';
import { HeroService } from "../hero.service";
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  // Add a hero property to the HeroesComponent for a hero named, Windstorm.

  //hero = 'Windstorm';

  //La variable heroes será la mateixa importada pero mock-heroes
  //heroes = HEROES;
  heroes: Hero[] = [];


  //Si volem tindre un parametre amb molts valors, se necesita una interfaç, se crea en el
  //seu propi fitxer (hero.ts) dins de src/app.
  //Açí se importa la interfaç i se initcialitzen els valors

/*  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };*/

  //Para poder recibir la lista de Heroes, añadimos un heroService privado al constructor
  //Cuando se cree un HeroesComponent, tambiens e crea una instancia de HeroService
  constructor(private heroService: HeroService, private messageService: MessageService) { }

/*  selectedHero?: Hero;
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }*/

  // Recibe los heroes del HeroService, y lo almacena en la variable definida
  /*
  getHeroes(): void {
    this.heroes = this.heroService.getHeroes();
  }
   */
  //Problema, el método es síncrono. Tiene que esperar a que reciba los heroes, lo que podria bloquear el navegador
  // Solución, hacerlo asíncrono.

  //.subscribe() espera a Observable para que emita la lista de héroes. subscribe() le pasará el método al callback, que asignará el heroes.
  //La página no se congelará, y se actualizará cuando reciba los héroes.
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  // Cuando el nombre no está vacio, se crea un objeto basado en el nombre del héroe.
  // A continuación, se pasa el Heroe a addHero, cuando se crea correctamente, subscribe lo añade a la lista de héroes que se muestran por pantalla
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  // Delete hero
  // HeroService se encarga de borrarlo, pero heroesComponent se encarga de actualziar la lista
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);  // Borra el héroe de la lista, recorre la lista, almacenando todos menos el que coincida
    this.heroService.deleteHero(hero.id).subscribe();   // Debemos subscribirnos aunque no devuelva valor
  }

  ngOnInit(): void {
    this.getHeroes();
  }

}
