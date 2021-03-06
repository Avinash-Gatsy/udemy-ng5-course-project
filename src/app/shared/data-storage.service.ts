import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import {RecipesService} from '../recipes/recipes.service';
import {Recipe} from '../recipes/recipe.model';
import {map} from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {AuthService} from '../auth/auth.service';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducers';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipesService,
              private authService: AuthService,
              private store: Store<fromApp.AppState>) {}

  storeRecipes() {
    // const headers = new HttpHeaders().set('Authorization', 'Bearer asfasfasf');
    // return this.http.put(`${environment.recipesURLFirebase}`,
    //   this.recipeService.getRecipes(),
    //   {
    //     observe: 'events',
    //     params: new HttpParams().set('auth', token)
    //   });
    const req = new HttpRequest('PUT', `${environment.recipesURLFirebase}`, this.recipeService.getRecipes(),
      {
        reportProgress: true,
        // params: new HttpParams().set('auth', token)
      });
    return this.http.request(req);
  }

  getRecipes() {
    this.http.get<Recipe[]>(`${environment.recipesURLFirebase}`)
      .pipe(map((recipes) => {
        for (const recipe of recipes) {
          if (!recipe['ingredient']) {
            recipe['ingredient'] = [];
          }
        }
        return recipes;
      }))
      .subscribe((recipes) => {
        console.log(recipes);
        this.recipeService.setRecipes(recipes);
      });
  }
}
