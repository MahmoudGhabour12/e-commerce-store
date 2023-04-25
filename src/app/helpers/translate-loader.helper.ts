import { HttpClient } from '@angular/common/http';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';

/**
 * The application's translate loader helper.
 */
export function TranslateHttpLoaderHelper(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
