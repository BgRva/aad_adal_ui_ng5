import { Injectable } from '@angular/core';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

/**
 * @typedef {Object} NotificationType - The type of a notification
 */
type NotificationType = 'success' | 'info' | 'warn' | 'error' | 'wait';

@Injectable()
export class LoggerService {
    private _toastOptions: any;

    constructor(private toastyConfig: ToastyConfig, private toastyService: ToastyService) {
        this._toastOptions = {
            showClose: true,
            timeout: 3000,
            theme: 'bootstrap'
        };
    }

    debug(msg: string) {
        console.log(msg);
    }

    warn(msg: string) {
        console.log(msg);
    }

    error(msg: string) {
        console.log(msg);
    }

    /**
     * Called to create a notification, to be desplayed by the listener
     * of the event
     * @param {NotificationType} severity of the notification
     * @param {string} summary or header of the notification
     * @param {string} detail or body of the notification
     */
    notify(type: NotificationType, message: string, header?: string) {
        const opts: ToastOptions = {
            title: header,
            msg: message,
            showClose: this._toastOptions.showClose,
            timeout: this._toastOptions.timeout,
            theme: this._toastOptions.theme,
        };
        switch (type) {
            case 'success':
                this.toastyService.success(opts);
                break;
            case 'warn':
                this.toastyService.warning(opts);
                break;
            case 'error':
                this.toastyService.error(opts);
                break;
            case 'wait':
                this.toastyService.wait(opts);
                break;
            default:
                this.toastyService.info(opts);
        }
    }

    notifySuccess(message: string, header?: string) {
        this.notify('success', message, header);
    }

    notifyInfo(message: string, header?: string) {
        this.notify('info', message, header);
    }

    notifyWarn(message: string, header?: string) {
        this.notify('warn', message, header);
    }

    notifyError(message: string, header?: string) {
        this.notify('error', message, header);
        console.log('error: ' + message);
    }

    notifyWait(message: string, header?: string) {
        this.notify('wait', message, header);
    }
}
