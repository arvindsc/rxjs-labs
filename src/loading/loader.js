export class Loader {
  loadingOverlay = document.getElementById("loading-overlay");
  constructor() {
    this.loadingOverlay.classList.add("open");
  }
}
