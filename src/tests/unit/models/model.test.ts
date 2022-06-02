import * as sinon from 'sinon';
import { expect } from 'chai';
import CarModel from '../../../models/Car';
import mongoose from 'mongoose';
import { Car } from '../../../interfaces/CarInterface';

const id = 'aB1cD2eF3gH4iJ5kL6mN7oP8';

const validCar = {
  _id: id,
  model: 'Uno da Escada',
  year: 1963,
  color: 'red',
  buyValue: 3500,
  seatsQty: 2,
  doorsQty: 2
};

const validCarUpdated = {
    _id: id,
    model: 'Opala Nervoso',
    year: 1960,
    color: 'black',
    buyValue: 3500,
    seatsQty: 2,
    doorsQty: 2
  };

describe('Insere novo carro', () => {
  let result: Car | null;
  
  before(async () => {
    const carModel = new CarModel();
    sinon.stub(mongoose.Model, 'create').resolves(validCar);
    result = await carModel.create(validCar);
  });

  after(() => {
    sinon.restore();
  });

  it('testa a função create do Model', async () => {
    expect(result).to.have.property('_id');
  });
});

describe('Consulta todos os carros cadastrados no banco de dados', () => {
  let result: Car[] | null;

  before(async () => {
    const carModel = new CarModel();
    sinon.stub(mongoose.Model, 'find').resolves([validCar]);
    result = await carModel.read();
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
    const carModel = new CarModel();
    sinon.stub(mongoose.Model, 'findOne').resolves(validCar);
    result = await carModel.readOne(id);
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
    const carModel = new CarModel();
    sinon.stub(mongoose.Model, 'findOneAndUpdate').resolves(validCarUpdated as any);
    result = await carModel.update(id, validCarUpdated);
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
    const carModel = new CarModel();
    sinon.stub(mongoose.Model, 'findOneAndDelete').resolves(validCar);
    result = await carModel.delete(id);
  });

  after(() => {
    sinon.restore();
  });

  it('testa a função delete do Model', () => {
    
    expect(result).to.have.property('_id');
  });
});
