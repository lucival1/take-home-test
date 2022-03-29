const Joi = require('joi');

const MAX_BENEFIT_VALUE = 50;
const MIN_BENEFIT_VALUE = 0;

const schema = Joi.object().keys({
  name: Joi.string().min(3).required(),
  expiresIn: Joi.number().required(),
  benefit: Joi.number().max(MAX_BENEFIT_VALUE).required()
});

const drugs = {
  DOLIPRANE: 'Doliprane',
  HERBAL_TEA: 'Herbal Tea',
  FERVEX: 'Fervex',
  MAGIC_PILL: 'Magic Pill',
  DAFALGAN: 'Dafalgan',
};

export class DrugModel {
  constructor(name, expiresIn, benefit) {
    if (this.constructor === DrugModel) {
      throw new TypeError('Abstract class "DrugModel" cannot be instantiated directly');
    }

    DrugModel.validate({
      name: name,
      expiresIn: expiresIn,
      benefit: benefit
    });

    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }

  static get schema() {
    return schema;
  }

  static get drugs() {
    return drugs;
  }

  static get maxBenefitValue() {
    return MAX_BENEFIT_VALUE;
  }

  static get minBenefitValue() {
    return MIN_BENEFIT_VALUE;
  }

  static updateBenefitValue(data) {
    if (data.benefit == MIN_BENEFIT_VALUE) return data;

    let benefitReduction = 0;
    if (data.benefit > MIN_BENEFIT_VALUE) benefitReduction++;
    if (data.expiresIn <= 0) benefitReduction++;

    data.benefit = data.benefit - benefitReduction;

    if (data.benefit < MIN_BENEFIT_VALUE) data.benefit = MIN_BENEFIT_VALUE;

    return data;
  }

  static updateExpiresInValue(data) {
    data.expiresIn = data.expiresIn - 1;

    return data;
  }

  static validate(data) {
    const { error } = schema.validate(data)

    if (error) {
      const validationError = new Error(error);
      validationError.errors = error.details.reduce((a, e) => {
        a[e.path.join('.')] = e.message;

        return a;
      }, {});

      throw validationError;
    }
  }
}
