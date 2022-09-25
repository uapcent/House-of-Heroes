import { Injectable } from '@angular/core';
//Importamos Hero (Interfaz) y Heroes (lista de heroes)
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
//Simular recibir datos de servidor con RxJS
import { Observable, of } from 'rxjs';
//Importa el servicio de mensajes
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

// Hero Service se encargará de obtener los datos de héroes desde un servidor/fichero/sistema
// Marca que participa en el sistema de inyecciones.
// Poniendo ProvidedIn: 'root', se crea un unico HeroService compartido entre las clases que lo necesiten.
// Con este método, Angular no cargará el servicio si nadie lo usa.
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';  // URL to web api

  //MessageService se inyecta en HeroService que se inyecta en HeroesComponent
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  //Devuelve la lista de HEROES con formato de lista de Hero
/*  getHeroes(): Hero[] {
    return HEROES;
  }*/
  //Nuevo método que simula un servidor, que "emite" un unico valor, la lista de héroes
/*  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES); //of() es una función de RxJS
    this.messageService.add('HeroService: fetched heroes'); // Envia un mensaje cuando se reciben los heroes
    return heroes;
  }*/
  /** GET heroes from the server */
  // getHeroes(): Observable<Hero[]> {
  //   return this.http.get<Hero[]>(this.heroesUrl)
  // }
  // getHeroes(): Observable<Hero[]> {
  //   return this.http.get<Hero[]>(this.heroesUrl)
  //     .pipe(
  //       catchError(this.handleError<Hero[]>('getHeroes', []))
  //     );
  // }
  /** GET heroes from the server */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  // getHero(id: number): Observable<Hero> {
  //   // For now, assume that a hero with the specified `id` always exists.
  //   // Error handling will be added in the next step of the tutorial.
  //   const hero = HEROES.find(h => h.id === id)!;
  //   this.messageService.add(`HeroService: fetched hero id=${id}`);
  //   return of(hero);
  // }
  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  // El API de heroes espera una cabecera especial en las operaciones de save
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** PUT: update the hero on the server */
  // Tap: Realiza operaciones sin modificar los datos, se suele usar para console.log o catch error
  // HttpClient.put() : Recibe tres parámetros:
  // - La URL donde se almacenan los datos
  // - Los datos a actualizar
  // - Otions?
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
