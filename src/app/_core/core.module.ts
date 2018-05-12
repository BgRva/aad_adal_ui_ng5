import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';

import { LoggerService } from './services/logger.service';
import { DataService } from './services/data.service';
import { throwIfAlreadyLoaded } from './import-guard';

@NgModule({
    declarations: [],
    exports: []
})
/**
 * This module provides singletons used across the project, primarily data
 * services.  All exports form this module will be instantiated as singletons.
 *
 * Note: You do not need to import this module (it is imported in the root module),
 * just import each individual service or item needed
 */
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                LoggerService,
                DataService
            ]
        };
    }
}
