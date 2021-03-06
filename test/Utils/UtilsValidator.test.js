import { expect } from 'chai';
import uAPI from '../../src';
import UtilsValidator from '../../src/Services/Utils/UtilsValidator';

describe('#UtilsValidator', () => {
  describe('.CURRENCY_CONVERSION', () => {
    it('should throw error for undefined', () => {
      const fn = () => UtilsValidator.CURRENCY_CONVERSION({});
      expect(fn).to.throw(uAPI.errors.Utils.UtilsValidationError.CurrenciesMissing);
    });

    it('should throw error for null', () => {
      const fn = () => UtilsValidator.CURRENCY_CONVERSION({ currencies: null });
      expect(fn).to.throw(uAPI.errors.Utils.UtilsValidationError.CurrenciesMissing);
    });

    it('should check if currencies is array', () => {
      const fn = () => UtilsValidator.CURRENCY_CONVERSION({ currencies: '123' });
      expect(fn).to.throw(uAPI.errors.Utils.UtilsValidationError.CurrenciesMissing);
    });

    it('should check if currencies array is not empty', () => {
      const fn = () => UtilsValidator.CURRENCY_CONVERSION({ currencies: [] });
      expect(fn).to.throw(uAPI.errors.Utils.UtilsValidationError.CurrenciesMissing);
    });

    it('should check if all fields exists', () => {
      const fn = () =>
        UtilsValidator.CURRENCY_CONVERSION({ currencies: [{ to: 'RUB' }] });
      expect(fn).to.throw(uAPI.errors.Utils.UtilsValidationError.CurrenciesMissing);
    });

    it('should check if all fields exists2', () => {
      const fn = () =>
        UtilsValidator.CURRENCY_CONVERSION({ currencies: [{}] });
      expect(fn).to.throw(uAPI.errors.Utils.UtilsValidationError.CurrenciesMissing);
    });

    it('should correct validate and return object', () => {
      const params = UtilsValidator.CURRENCY_CONVERSION(
        { currencies: [{ from: 'UAR', to: 'EUR'}] }
      );
      expect(params).not.equal(undefined);
    });
  });
});
