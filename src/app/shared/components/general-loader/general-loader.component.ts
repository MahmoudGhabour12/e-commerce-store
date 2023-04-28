import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-general-loader',
  templateUrl: './general-loader.component.html',
  styleUrls: ['./general-loader.component.sass'],
})
export class GeneralLoaderComponent {
  /**
   * Sets the is loading to block the ui until loading.
   */
  @Input() isLoading: boolean;
}
