/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ɵAnimationEngine } from '@angular/animations/browser';
import { PlatformLocation, ɵPLATFORM_SERVER_ID as PLATFORM_SERVER_ID } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Injector, NgModule, NgZone, Optional, PLATFORM_ID, PLATFORM_INITIALIZER, RendererFactory2, Testability, createPlatformFactory, platformCore, ɵALLOW_MULTIPLE_PLATFORMS as ALLOW_MULTIPLE_PLATFORMS } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule, DOCUMENT, EVENT_MANAGER_PLUGINS, ɵSharedStylesHost as SharedStylesHost, ɵgetDOM as getDOM } from '@angular/platform-browser';
import { ɵplatformCoreDynamic as platformCoreDynamic } from '@angular/platform-browser-dynamic';
import { NoopAnimationsModule, ɵAnimationRendererFactory } from '@angular/platform-browser/animations';
import { DominoAdapter, parseDocument } from './domino_adapter';
import { SERVER_HTTP_PROVIDERS } from './http';
import { ServerPlatformLocation } from './location';
import { PlatformState } from './platform_state';
import { ServerEventManagerPlugin } from './server_events';
import { ServerRendererFactory2 } from './server_renderer';
import { ServerStylesHost } from './styles_host';
import { INITIAL_CONFIG } from './tokens';
function notSupported(feature) {
    throw new Error("platform-server does not support '" + feature + "'.");
}
export var INTERNAL_SERVER_PLATFORM_PROVIDERS = [
    { provide: DOCUMENT, useFactory: _document, deps: [Injector] },
    { provide: PLATFORM_ID, useValue: PLATFORM_SERVER_ID },
    { provide: PLATFORM_INITIALIZER, useFactory: initDominoAdapter, multi: true, deps: [Injector] }, {
        provide: PlatformLocation,
        useClass: ServerPlatformLocation,
        deps: [DOCUMENT, [Optional, INITIAL_CONFIG]]
    },
    { provide: PlatformState, deps: [DOCUMENT] },
    // Add special provider that allows multiple instances of platformServer* to be created.
    { provide: ALLOW_MULTIPLE_PLATFORMS, useValue: true }
];
function initDominoAdapter(injector) {
    return function () { DominoAdapter.makeCurrent(); };
}
export function instantiateServerRendererFactory(renderer, engine, zone) {
    return new ɵAnimationRendererFactory(renderer, engine, zone);
}
export var SERVER_RENDER_PROVIDERS = [
    ServerRendererFactory2,
    {
        provide: RendererFactory2,
        useFactory: instantiateServerRendererFactory,
        deps: [ServerRendererFactory2, ɵAnimationEngine, NgZone]
    },
    ServerStylesHost,
    { provide: SharedStylesHost, useExisting: ServerStylesHost },
    { provide: EVENT_MANAGER_PLUGINS, multi: true, useClass: ServerEventManagerPlugin },
];
/**
 * The ng module for the server.
 *
 * @experimental
 */
var ServerModule = /** @class */ (function () {
    function ServerModule() {
    }
    ServerModule.decorators = [
        { type: NgModule, args: [{
                    exports: [BrowserModule],
                    imports: [HttpModule, HttpClientModule, NoopAnimationsModule],
                    providers: [
                        SERVER_RENDER_PROVIDERS,
                        SERVER_HTTP_PROVIDERS,
                        { provide: Testability, useValue: null },
                    ],
                },] }
    ];
    return ServerModule;
}());
export { ServerModule };
function _document(injector) {
    var config = injector.get(INITIAL_CONFIG, null);
    if (config && config.document) {
        return parseDocument(config.document, config.url);
    }
    else {
        return getDOM().createHtmlDocument();
    }
}
/**
 * @experimental
 */
export var platformServer = createPlatformFactory(platformCore, 'server', INTERNAL_SERVER_PLATFORM_PROVIDERS);
/**
 * The server platform that supports the runtime compiler.
 *
 * @experimental
 */
export var platformDynamicServer = createPlatformFactory(platformCoreDynamic, 'serverDynamic', INTERNAL_SERVER_PLATFORM_PROVIDERS);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tc2VydmVyL3NyYy9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQVFBLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxtQkFBbUIsSUFBSSxrQkFBa0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzVGLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFBNkIsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxvQkFBb0IsRUFBeUIsZ0JBQWdCLEVBQWdDLFdBQVcsRUFBRSxxQkFBcUIsRUFBYSxZQUFZLEVBQUUseUJBQXlCLElBQUksd0JBQXdCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN1QsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBRSxxQkFBcUIsRUFBRSxpQkFBaUIsSUFBSSxnQkFBZ0IsRUFBa0IsT0FBTyxJQUFJLE1BQU0sRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ25LLE9BQU8sRUFBQyxvQkFBb0IsSUFBSSxtQkFBbUIsRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBQzlGLE9BQU8sRUFBQyxvQkFBb0IsRUFBRSx5QkFBeUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBRXJHLE9BQU8sRUFBQyxhQUFhLEVBQUUsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDOUQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzdDLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLFlBQVksQ0FBQztBQUNsRCxPQUFPLEVBQUMs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TSxDQUFDLElBQU0sY0FBYyxHQUN2QixxQkFBcUIsQ0FBQyxZQUFZLEVBQUUsUUFBUSxFQUFFLGtDQUFrQyxDQUFDLENBQUM7Ozs7OztBQU90RixNQUFNLENBQUMsSUFBTSxxQkFBcUIsR0FDOUIscUJBQXFCLENBQUMsbUJBQW1CLEVBQUUsZUFBZSxFQUFFLGtDQUFrQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7ybVBbmltYXRpb25FbmdpbmV9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMvYnJvd3Nlcic7XG5pbXBvcnQge1BsYXRmb3JtTG9jYXRpb24sIMm1UExBVEZPUk1fU0VSVkVSX0lEIGFzIFBMQVRGT1JNX1NFUlZFUl9JRH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7SHR0cENsaWVudE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiwgSW5qZWN0b3IsIE5nTW9kdWxlLCBOZ1pvbmUsIE9wdGlvbmFsLCBQTEFURk9STV9JRCwgUExBVEZPUk1fSU5JVElBTElaRVIsIFBsYXRmb3JtUmVmLCBQcm92aWRlciwgUmVuZGVyZXJGYWN0b3J5MiwgUm9vdFJlbmRlcmVyLCBTdGF0aWNQcm92aWRlciwgVGVzdGFiaWxpdHksIGNyZWF0ZVBsYXRmb3JtRmFjdG9yeSwgaXNEZXZNb2RlLCBwbGF0Zm9ybUNvcmUsIMm1QUxMT1dfTVVMVElQTEVfUExBVEZPUk1TIGFzIEFMTE9XX01VTFRJUExFX1BMQVRGT1JNU30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0h0dHBNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHtCcm93c2VyTW9kdWxlLCBET0NVTUVOVCwgRVZFTlRfTUFOQUdFUl9QTFVHSU5TLCDJtVNoYXJlZFN0eWxlc0hvc3QgYXMgU2hhcmVkU3R5bGVzSG9zdCwgybVUUkFOU0lUSU9OX0lELCDJtWdldERPTSBhcyBnZXRET019IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHvJtXBsYXRmb3JtQ29yZUR5bmFtaWMgYXMgcGxhdGZvcm1Db3JlRHluYW1pY30gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci1keW5hbWljJztcbmltcG9ydCB7Tm9vcEFuaW1hdGlvbnNNb2R1bGUsIMm1QW5pbWF0aW9uUmVuZGVyZXJGYWN0b3J5fSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuXG5pbXBvcnQge0RvbWlub0FkYXB0ZXIsIHBhcnNlRG9jdW1lbnR9IGZyb20gJy4vZG9taW5vX2FkYXB0ZXInO1xuaW1wb3J0IHtTRVJWRVJfSFRUUF9QUk9WSURFUlN9IGZyb20gJy4vaHR0cCc7XG5pbXBvcnQge1NlcnZlclBsYXRmb3JtTG9jYXRpb259IGZyb20gJy4vbG9jYXRpb24nO1xuaW1wb3J0IHtQbGF0Zm9ybVN0YXRlfSBmcm9tICcuL3BsYXRmb3JtX3N0YXRlJztcbmltcG9ydCB7U2VydmVyRXZlbnRNYW5hZ2VyUGx1Z2lufSBmcm9tICcuL3NlcnZlcl9ldmVudHMnO1xuaW1wb3J0IHtTZXJ2ZXJSZW5kZXJlckZhY3RvcnkyfSBmcm9tICcuL3NlcnZlcl9yZW5kZXJlcic7XG5pbXBvcnQge1NlcnZlclN0eWxlc0hvc3R9IGZyb20gJy4vc3R5bGVzX2hvc3QnO1xuaW1wb3J0IHtJTklUSUFMX0NPTkZJRywgUGxhdGZvcm1Db25maWd9IGZyb20gJy4vdG9rZW5zJztcblxuZnVuY3Rpb24gbm90U3VwcG9ydGVkKGZlYXR1cmU6IHN0cmluZyk6IEVycm9yIHtcbiAgdGhyb3cgbmV3IEVycm9yKGBwbGF0Zm9ybS1zZXJ2ZXIgZG9lcyBub3Qgc3VwcG9ydCAnJHtmZWF0dXJlfScuYCk7XG59XG5cbmV4cG9ydCBjb25zdCBJTlRFUk5BTF9TRVJWRVJfUExBVEZPUk1fUFJPVklERVJTOiBTdGF0aWNQcm92aWRlcltdID0gW1xuICB7cHJvdmlkZTogRE9DVU1FTlQsIHVzZUZhY3Rvcnk6IF9kb2N1bWVudCwgZGVwczogW0luamVjdG9yXX0sXG4gIHtwcm92aWRlOiBQTEFURk9STV9JRCwgdXNlVmFsdWU6IFBMQVRGT1JNX1NFUlZFUl9JRH0sXG4gIHtwcm92aWRlOiBQTEFURk9STV9JTklUSUFMSVpFUiwgdXNlRmFjdG9yeTogaW5pdERvbWlub0FkYXB0ZXIsIG11bHRpOiB0cnVlLCBkZXBzOiBbSW5qZWN0b3JdfSwge1xuICAgIHByb3ZpZGU6IFBsYXRmb3JtTG9jYXRpb24sXG4gICAgdXNlQ2xhc3M6IFNlcnZlclBsYXRmb3JtTG9jYXRpb24sXG4gICAgZGVwczogW0RPQ1VNRU5ULCBbT3B0aW9uYWwsIElOSVRJQUxfQ09ORklHXV1cbiAgfSxcbiAge3Byb3ZpZGU6IFBsYXRmb3JtU3RhdGUsIGRlcHM6IFtET0NVTUVOVF19LFxuICAvLyBBZGQgc3BlY2lhbCBwcm92aWRlciB0aGF0IGFsbG93cyBtdWx0aXBsZSBpbnN0YW5jZXMgb2YgcGxhdGZvcm1TZXJ2ZXIqIHRvIGJlIGNyZWF0ZWQuXG4gIHtwcm92aWRlOiBBTExPV19NVUxUSVBMRV9QTEFURk9STVMsIHVzZVZhbHVlOiB0cnVlfVxuXTtcblxuZnVuY3Rpb24gaW5pdERvbWlub0FkYXB0ZXIoaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gIHJldHVybiAoKSA9PiB7IERvbWlub0FkYXB0ZXIubWFrZUN1cnJlbnQoKTsgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluc3RhbnRpYXRlU2VydmVyUmVuZGVyZXJGYWN0b3J5KFxuICAgIHJlbmRlcmVyOiBSZW5kZXJlckZhY3RvcnkyLCBlbmdpbmU6IMm1QW5pbWF0aW9uRW5naW5lLCB6b25lOiBOZ1pvbmUpIHtcbiAgcmV0dXJuIG5ldyDJtUFuaW1hdGlvblJlbmRlcmVyRmFjdG9yeShyZW5kZXJlciwgZW5naW5lLCB6b25lKTtcbn1cblxuZXhwb3J0IGNvbnN0IFNFUlZFUl9SRU5ERVJfUFJPVklERVJTOiBQcm92aWRlcltdID0gW1xuICBTZXJ2ZXJSZW5kZXJlckZhY3RvcnkyLFxuICB7XG4gICAgcHJvdmlkZTogUmVuZGVyZXJGYWN0b3J5MixcbiAgICB1c2VGYWN0b3J5OiBpbnN0YW50aWF0ZVNlcnZlclJlbmRlcmVyRmFjdG9yeSxcbiAgICBkZXBzOiBbU2VydmVyUmVuZGVyZXJGYWN0b3J5MiwgybVBbmltYXRpb25FbmdpbmUsIE5nWm9uZV1cbiAgfSxcbiAgU2VydmVyU3R5bGVzSG9zdCxcbiAge3Byb3ZpZGU6IFNoYXJlZFN0eWxlc0hvc3QsIHVzZUV4aXN0aW5nOiBTZXJ2ZXJTdHlsZXNIb3N0fSxcbiAge3Byb3ZpZGU6IEVWRU5UX01BTkFHRVJfUExVR0lOUywgbXVsdGk6IHRydWUsIHVzZUNsYXNzOiBTZXJ2ZXJFdmVudE1hbmFnZXJQbHVnaW59LFxuXTtcblxuLyoqXG4gKiBUaGUgbmcgbW9kdWxlIGZvciB0aGUgc2VydmVyLlxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuQE5nTW9kdWxlKHtcbiAgZXhwb3J0czogW0Jyb3dzZXJNb2R1bGVdLFxuICBpbXBvcnRzOiBbSHR0cE1vZHVsZSwgSHR0cENsaWVudE1vZHVsZSwgTm9vcEFuaW1hdGlvbnNNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICBTRVJWRVJfUkVOREVSX1BST1ZJREVSUyxcbiAgICBTRVJWRVJfSFRUUF9QUk9WSURFUlMsXG4gICAge3Byb3ZpZGU6IFRlc3RhYmlsaXR5LCB1c2VWYWx1ZTogbnVsbH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFNlcnZlck1vZHVsZSB7XG59XG5cbmZ1bmN0aW9uIF9kb2N1bWVudChpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgbGV0IGNvbmZpZzogUGxhdGZvcm1Db25maWd8bnVsbCA9IGluamVjdG9yLmdldChJTklUSUFMX0NPTkZJRywgbnVsbCk7XG4gIGlmIChjb25maWcgJiYgY29uZmlnLmRvY3VtZW50KSB7XG4gICAgcmV0dXJuIHBhcnNlRG9jdW1lbnQoY29uZmlnLmRvY3VtZW50LCBjb25maWcudXJsKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZ2V0RE9NKCkuY3JlYXRlSHRtbERvY3VtZW50KCk7XG4gIH1cbn1cblxuLyoqXG4gKiBAZXhwZXJpbWVudGFsXG4gKi9cbmV4cG9ydCBjb25zdCBwbGF0Zm9ybVNlcnZlciA9XG4gICAgY3JlYXRlUGxhdGZvcm1GYWN0b3J5KHBsYXRmb3JtQ29yZSwgJ3NlcnZlcicsIElOVEVSTkFMX1NFUlZFUl9QTEFURk9STV9QUk9WSURFUlMpO1xuXG4vKipcbiAqIFRoZSBzZXJ2ZXIgcGxhdGZvcm0gdGhhdCBzdXBwb3J0cyB0aGUgcnVudGltZSBjb21waWxlci5cbiAqXG4gKiBAZXhwZXJpbWVudGFsXG4gKi9cbmV4cG9ydCBjb25zdCBwbGF0Zm9ybUR5bmFtaWNTZXJ2ZXIgPVxuICAgIGNyZWF0ZVBsYXRmb3JtRmFjdG9yeShwbGF0Zm9ybUNvcmVEeW5hbWljLCAnc2VydmVyRHluYW1pYycsIElOVEVSTkFMX1NFUlZFUl9QTEFURk9STV9QUk9WSURFUlMpO1xuIl19