import { AppActions } from '../app/app.constants';

export class DropZone {

  // CSS selectors:
  static S_ROOT = '.dropZone__root';
  static S_ERROR = '.dropZone__root.dropZone--hasError';
  static S_CLOSE_ERROR_BUTTON = '.dropZone__closeErrorButton';

  // Elements:
  root = document.querySelector(DropZone.S_ROOT);
  errorRoot = document.querySelector(DropZone.S_ERROR);
  closeErrorButton = document.querySelector(DropZone.S_CLOSE_ERROR_BUTTON);

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
    this.onAction(AppActions.CHANGE_CURSOR_MODE, 'hidden'); // TODO: It should be jsPaint doing this change...
  }

  handleDragLeave(e) {
    this.root.removeEventListener('drop', this.handleDrop);
    this.root.removeEventListener('dragover', this.handleDragOver);
    this.root.removeEventListener('dragleave', this.handleDragLeave);
    this.root.setAttribute('hidden', true);

    if (e) {
      this.onAction(AppActions.ENABLE);
      this.onAction(AppActions.CHANGE_CURSOR_MODE, 'paint'); // TODO: It should be jsPaint doing this change...
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

    this.handleDragLeave();
  }

  // Error:

  showError() {
    this.errorRoot.removeAttribute('hidden');
    this.closeErrorButton.addEventListener('click', this.hideError);

    this.onAction(AppActions.DISABLE);
    this.onAction(AppActions.CHANGE_CURSOR_MODE, 'interact'); // TODO: It should be jsPaint doing this change...
  }

  hideError(e) {
    this.errorRoot.setAttribute('hidden', true);
    this.closeErrorButton.removeEventListener('click', this.hideError);

    if (e) {
      this.onAction(AppActions.ENABLE);
      this.onAction(AppActions.CHANGE_CURSOR_MODE, 'paint'); // TODO: It should be jsPaint doing this change...
    }
  }

}
