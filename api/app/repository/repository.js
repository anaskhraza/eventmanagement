export class Repository {
  constructor(modelInstance) {
    this.modelInstance = modelInstance;
  }
  findRecord(where = {}, attributes, include, options = {}) {
    let params = { where };
    if (attributes) {
      params.attributes = attributes;
    }
    if (include) {
      params.include = include;
    }
    if (options) {
      params = Object.assign({}, params, options);
    }
    return this.modelInstance.findOne(params);
  }

  findAllRecords(where = {}, attributes, include, options = {}, plain = false) {
    let params = { where };
    if (attributes) {
      params.attributes = attributes;
    }
    if (include) {
      params.include = include;
    }
    if (options) {
      params = Object.assign({}, params, options);
    }
    params.raw = true; // <----------- Magic is here
    params.nest = true; // <----------- Magic is here
    //console.log("params", params);
    const instance = this.modelInstance.findAll(params);
    return plain ? instance.map(el => el.get({ plain: true })) : instance;
  }

  updateRecord(where = {}, values, options = {}) {
    return new Promise((resolve, reject) => {
      const params = Object.assign(
        {},
        {
          where,
          returning: true
        },
        options
      );
      this.modelInstance
        .update(values, params)
        .then(values => {
          let returnValues = null;
          if (values[0]) {
            returnValues = values[1][0];
          }
          resolve(returnValues);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  updateRecords(where = {}, values, options = {}) {
    return new Promise((resolve, reject) => {
      const params = Object.assign(
        {},
        {
          where,
          returning: true
        },
        options
      );
      this.modelInstance
        .update(values, params)
        .then(values => {
          const rowsUpdated = values[0];
          const rowsValues = values[1];
          resolve({ rowsUpdated, rowsValues });
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  createRecord(values, options = {}) {
    return this.modelInstance.create(values, options);
  }

  createOrUpdate(values, options = {}) {
    return this.modelInstance.upsert(values, options);
  }

  createBulkRecords(data, options = {}) {
    return this.modelInstance.bulkCreate(data, options);
  }

  deleteRecord(whereObject, options) {
    const params = Object.assign({}, { where: whereObject }, options);
    return this.modelInstance.destroy(params);
  }
}
