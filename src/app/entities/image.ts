import { IPosition } from 'angular2-draggable';

export interface ImageWithHistory {
  previous: EditingImage[];
  current: EditingImage;
  next: EditingImage[];
}

export interface EditingImage {
  src: string;
  inputs: TextInput[];
  zoom: number;
  rotate: number;
}

export interface TextInput {
  position: IPosition;
  content: string;
}
