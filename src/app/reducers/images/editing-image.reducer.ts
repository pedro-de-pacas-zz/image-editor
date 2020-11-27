import { createReducer, on } from '@ngrx/store';
import * as EditingImageActions from './editing-image.actions';
import { AppState } from '../index';
import { newText } from '../../services/get-images-urls.service';


export const appState: AppState = {
  images: [], selectedImage: 0
};

export const imagesReducer = createReducer(
  appState,
  on(EditingImageActions.imagesAreLoaded, (state: AppState, {images}) => ({
    ...state,
    images,
    selectedImage: 0
  })),
  on(EditingImageActions.setEditingImageAction, (state: AppState, {index}) => ({
    ...state,
    selectedImage: index
  })),
  on(EditingImageActions.addInputToImageAction, (state: AppState) => ({
    ...state,
    images: state.images.map((iterImage, index) =>
      state.selectedImage === index ? {
        ...iterImage,
        previous: [iterImage.current, ...iterImage.previous],
        current: {
          ...iterImage.current,
          inputs: [...iterImage.current.inputs, {
            position: {x: 0, y: 0},
            content: newText
          }]
        },
        next: [],
      } : iterImage
    )
  })),
  on(EditingImageActions.zommInAction, (state: AppState) => ({
    ...state,
    images: state.images.map((iterImage, index) =>
      state.selectedImage === index ? {
        ...iterImage,
        previous: [iterImage.current, ...iterImage.previous],
        current: {
          ...iterImage.current,
          zoom: iterImage.current.zoom * 1.1
        },
        next: []
      } : iterImage
    )
  })),
  on(EditingImageActions.zommOutAction, (state: AppState) => ({
    ...state,
    images: state.images.map((iterImage, index) =>
      state.selectedImage === index ? {
        ...iterImage,
        previous: [iterImage.current, ...iterImage.previous],
        current: {
          ...iterImage.current,
          zoom: iterImage.current.zoom * 0.9
        },
        next: []
      } : iterImage
    )
  })),
  on(EditingImageActions.rotateAction, (state: AppState) => ({
    ...state,
    images: state.images.map((iterImage, index) =>
      state.selectedImage === index ? {
        ...iterImage,
        previous: [iterImage.current, ...iterImage.previous],
        current: {
          ...iterImage.current,
          rotate: (iterImage.current.rotate + 45) % 360
        },
        next: []
      } : iterImage
    )
  })),
  on(EditingImageActions.updateContentAction, (state: AppState, {input, event}) => ({
    ...state,
    images: state.images.map((iterImage, index) =>
      state.selectedImage === index ? {
        ...iterImage,
        previous: [iterImage.current, ...iterImage.previous],
        current: {
          ...iterImage.current,
          inputs: iterImage.current.inputs.map((iterInput) =>
            iterInput === input ? {
              ...iterInput,
              content: (event.target as HTMLInputElement).value
            } : iterInput)
        },
        next: []
      } : iterImage
    )
  })),
  on(EditingImageActions.undoAction, (state: AppState) => ({
    ...state,
    images: state.images.map((iterImage, index) =>
      state.selectedImage === index ? {
        ...iterImage,
        current: iterImage.previous[0],
        previous: iterImage.previous.slice(1),
        next: [iterImage.current, ...iterImage.next]
      } : iterImage
    )
  })),
  on(EditingImageActions.redoAction, (state: AppState) => ({
    ...state,
    images: state.images.map((iterImage, index) =>
      state.selectedImage === index ? {
        ...iterImage,
        current: iterImage.next[0],
        next: iterImage.next.slice(1),
        previous: [iterImage.current, ...iterImage.previous]
      } : iterImage
    )
  })),
  on(EditingImageActions.savePositionAction, (state: AppState, {input, event}) => ({
    ...state,
    images: state.images.map((iterImage, index) =>
      state.selectedImage === index ? {
        ...iterImage,
        previous: [iterImage.current, ...iterImage.previous],
        current: {
          ...iterImage.current,
          inputs: iterImage.current.inputs.map((iterInput) =>
            iterInput === input ? {
              ...iterInput,
              position: event
            } : iterInput)
        },
        next: []
      } : iterImage
    )
  })),
  on(EditingImageActions.deleteTextAction, (state: AppState, {input}) => ({
    ...state,
    images: state.images.map((iterImage, index) =>
      state.selectedImage === index ? {
        ...iterImage,
        previous: [iterImage.current, ...iterImage.previous],
        current: {
          ...iterImage.current,
          inputs: iterImage.current.inputs.filter(iterInput => iterInput !== input)
        },
        next: []
      } : iterImage
    )
  })),
  on(EditingImageActions.updatePositionAction, (state: AppState) => ({
    ...state,
    images: state.images.map((iterImage, index) =>
      state.selectedImage === index ? {
        ...iterImage,
        current: {
          ...iterImage.current,
          inputs: iterImage.current.inputs.map(iterInput => ({...iterInput})),
        }
      } : iterImage
    )
  }))
);
