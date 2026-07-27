import { portfolioDom } from '../../portfolio-dom.js';
import { AppActions } from '../app/app.constants';

export class DropZone {

  // Elements:
  root = document.querySelector(portfolioDom.dropZone.root);
  errorRoot = document.querySelector(portfolioDom.dropZone.error);
  closeErrorButton = document.querySelector(portfolioDom.dropZone.closeError);

  // Callback:
  onAction;

  constructor({
    onAction,
  }) {
    this.onAction = onAction;

    this.handleDragEnter = this.handleDragEnter.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.hideError = this.hideError.bind(this);

    this.addEventListeners();
  }

  addEventListeners() {
    window.addEventListener('dragenter', this.handleDragEnter);
  }

  handleDragEnter() {
    this.root.addEventListener('drop', this.handleDrop);
    this.root.addEventListener('dragover', this.handleDragOver);
    this.root.addEventListener('dragleave', this.handleDragLeave);
    this.root.removeAttribute('hidden');

    this.hideError();

    this.onAction(AppActions.DISABLE);
    this.onAction(AppActions.CHANGE_CURSOR_MODE, 'hidden');
  }

  handleDragLeave(e) {
    this.root.removeEventListener('drop', this.handleDrop);
    this.root.removeEventListener('dragover', this.handleDragOver);
    this.root.removeEventListener('dragleave', this.handleDragLeave);
    this.root.setAttribute('hidden', true);

    if (e) {
      this.onAction(AppActions.ENABLE);
      this.onAction(AppActions.CHANGE_CURSOR_MODE, 'paint');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  handleDragOver(e) {
    e.preventDefault();
  }

  handleDrop(e) {
    e.preventDefault();

    const file = e.dataTransfer.files[0] || e.dataTransfer.items.filter((item) => item.kind === 'file')[0]?.getAsFile();

    this.onAction(AppActions.UPLOAD, file);

    this.handleDragLeave(this.errorRoot.hasAttribute('hidden') ? e : null);
  }

  showError() {
    this.errorRoot.removeAttribute('hidden');
    this.closeErrorButton.addEventListener('click', this.hideError);

    this.onAction(AppActions.DISABLE);
    this.onAction(AppActions.CHANGE_CURSOR_MODE, 'interact');
  }

  hideError(e) {
    this.errorRoot.setAttribute('hidden', true);
    this.closeErrorButton.removeEventListener('click', this.hideError);

    if (e) {
      this.onAction(AppActions.ENABLE);
      this.onAction(AppActions.CHANGE_CURSOR_MODE, 'paint');
    }
  }

}
