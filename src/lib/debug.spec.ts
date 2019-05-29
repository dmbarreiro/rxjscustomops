import * as sinon from 'sinon';
import { of } from 'rxjs';

import { customOps } from '../index';

describe('default behavior', () => {
    let spy: sinon.SinonSpy;
    beforeEach(() => {
        spy = sinon.spy(console, 'log');
    });
    afterEach(() => {
        spy.restore();
    });
    it('INFO logging shows', () => {
        const testOb = of(1, 2, 3);
        testOb.pipe(
            customOps.debug(customOps.RxJsLoggingLevel.INFO, 'info')
        ).subscribe();
        sinon.assert.calledWith(spy, sinon.match(/^info: /));
    });
    it('ERROR logging shows', () => {
        const testOb = of(1, 2, 3);
        testOb.pipe(
            customOps.debug(customOps.RxJsLoggingLevel.ERROR, 'error')
        ).subscribe();
        sinon.assert.calledWith(spy, sinon.match(/^error: /));
    });
    it('DEBUG logging does not show', () => {
        const testOb = of(1, 2, 3);
        testOb.pipe(
            customOps.debug(customOps.RxJsLoggingLevel.DEBUG, 'debug')
        ).subscribe();
        sinon.assert.neverCalledWith(spy, sinon.match(/^debug: /));
    });
    it('Check number of calls', () => {
        const testOb = of(1, 2, 3);
        testOb.pipe(
            customOps.debug(customOps.RxJsLoggingLevel.INFO, 'num')
        ).subscribe();
        sinon.assert.calledThrice(spy);
    });
});

describe('Logging level changes', () => {
    let spy: any;
    beforeEach(() => {
        spy = sinon.spy(console, 'log');
    });
    afterEach(() => {
        // restore the environment as it was before
        spy.restore();
    });
    after(() => {
        customOps.setRxJsLoggingLevel(customOps.RxJsLoggingLevel.INFO);
    });
    it('Set logging level to DEBUG', () => {
        customOps.setRxJsLoggingLevel(customOps.RxJsLoggingLevel.DEBUG);
        const testOb = of(1, 2, 3);
        testOb.pipe(
            customOps.debug(customOps.RxJsLoggingLevel.DEBUG, 'debug')
        ).subscribe();
        sinon.assert.calledWith(spy, sinon.match(/^debug: /));

    });
    it('INFO logging shows', () => {
        const testOb = of(1, 2, 3);
        testOb.pipe(
            customOps.debug(customOps.RxJsLoggingLevel.INFO, 'info')
            ).subscribe();
            sinon.assert.calledWith(spy, sinon.match(/^info: /));
        });
    it('TRACE logging does not show', () => {
        const testOb = of(1, 2, 3);
        testOb.pipe(
            customOps.debug(customOps.RxJsLoggingLevel.TRACE, 'trace')
            ).subscribe();
            sinon.assert.neverCalledWith(spy, sinon.match(/^trace: /));
        });
    it('Check number of calls', () => {
        const testOb = of(1, 2, 3);
        testOb.pipe(
            customOps.debug(customOps.RxJsLoggingLevel.DEBUG, 'num')
        ).subscribe();
        sinon.assert.calledThrice(spy);
    });
            
});