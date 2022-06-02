import * as sinon from 'sinon';
import { expect } from 'chai';
import CarModel from '../../../models/Car';
import { Car } from '../../../interfaces/CarInterface';
import { Types } from 'mongoose';

const id = new Types.ObjectId();

const validCar = {
  _id: id,
  model: 'Uno da Escada',
  year: 1963,
  color: 'red',
  buyValue: 3500,
  seatsQty: 2,
  doorsQty: 2
} as Car;

const validCarUpdated = {
    _id: id,
    model: 'Opala Nervoso',
    year: 1960,
    color: 'black',
    buyValue: 3500,
    seatsQty: 2,
    doorsQty: 2
  } as Car;

describe('Insere novo carro', () => {
  let result: Car | null;

  before(async () => {
    const model = new CarModel();
    sinon.stub(model, 'create').resolves(validCar);
    result = await model.create(validCar);
  });

  after(() => {
    sinon.restore();
  });

  it('testa a função create do Model', () => {
    expect(result).to.have.property('_id');
  });
});

describe('Consulta todos os carros cadastrados no banco de dados', () => {
  let result: Car[] | null;

  before(async () => {
    const model = new CarModel();
    sinon.stub(model, 'read').resolves([validCar]);
    result = await model.read();
  });

  after(() => {
    sinon.restore();
  });

  it('testa a função read do Model', () => {
    expect(result).to.be.an('array');
    expect(result).to.have.lengthOf(1);
  });
});

describe('Consulta um carro no banco de dados', () => {
  let result: Car | null;

  before(async () => {
    const model = new CarModel();
    sinon.stub(model, 'readOne').resolves(validCar);
    result = await model.readOne(id.toString());
  });

  after(() => {
    sinon.restore();
  });

  it('testa a função readOne do Model', () => {
    expect(result).to.have.property('_id');
  });
});

describe('Altera um carro no banco de dados', () => {
  let result: Car | null;

  before(async () => {
    const model = new CarModel();
    sinon.stub(model, 'update').resolves(validCarUpdated);
    result = await model.update(id.toString(), validCarUpdated);
  });

  after(() => {
    sinon.restore();
  });

  it('testa a função readOne do Model', () => {
    expect(result?.model).to.equals('Opala Nervoso');
    expect(result?.year).to.equals(1960);
    expect(result?.color).to.equals('black');
  });
});

describe('Remove um carro no banco de dados', () => {
  let result: Car | null;

  before(async () => {
    const model = new CarModel();
    sinon.stub(model, 'delete').resolves(validCar);
    result = await model.delete(id.toString());
  });

  after(() => {
    sinon.restore();
  });

  it('testa a função delete do Model', () => {
    expect(result).to.have.property('_id');
  });
});
