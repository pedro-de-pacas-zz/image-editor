import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GetImagesUrlsService } from '../services/get-images-urls.service';
import { map, mergeMap } from 'rxjs/operators';
import * as ImagesActions from '../reducers/images/editing-image.actions';

@Injectable()
export class ImagesEffect {
  loadUrls$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ImagesActions.loadImages),
      mergeMap(() => {
        return this.getImagesUrlsService.getImagesUrls().pipe(
          map(images => ImagesActions.imagesAreLoaded({images}))
        );
      })
    )
  );

  constructor(private actions$: Actions, private getImagesUrlsService: GetImagesUrlsService) {
  }
}
