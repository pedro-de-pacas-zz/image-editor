import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ImageWithHistory } from '../entities/image';

export const newText = 'Enter Text Here';

@Injectable()
export class GetImagesUrlsService {

  getImagesUrls(): Observable<ImageWithHistory[]> {
    return of(
      [{
        previous: [],
        current: {
          src: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Alexandre_Lacauchie_-_Gilbert_Duprez_as_Gaston_in_Verdi%27s_J%C3%A9rusalem.jpg',
          zoom: 1,
          rotate: 0,
          inputs: [{
            position: {x: 0, y: 0},
            content: newText
          }]
        },
        next: [],
      }, {
        previous: [],
        current: {
          src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adolphe-Joseph-Louis_Alizard_from_Le_Charivari.jpg/800px-Adolphe-Joseph-Louis_Alizard_from_Le_Charivari.jpg',
          zoom: 1,
          rotate: 0,
          inputs: [{
            position: {x: 0, y: 0},
            content: newText
          }]
        },
        next: []
      }]);
  }
}
