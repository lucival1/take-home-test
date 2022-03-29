import {DrugModel} from "./models/drug";


export class MagicPill extends DrugModel {
  constructor(expiresIn, benefit) {
    super(DrugModel.drugs.MAGIC_PILL, expiresIn, benefit)
  }

  canProcess(name) {
    return name === DrugModel.drugs.MAGIC_PILL;
  }

  updateBenefitValue(data) {
    try {
      DrugModel.validate(data);

      return data;
    } catch (error) {
      throw error;
    }
  }

  updateExpiresInValue(data) {
    try {
      DrugModel.validate(data);

      return data;
    } catch (error) {
      throw error;
    }
  }
}