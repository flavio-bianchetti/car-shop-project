import * as sinon from 'sinon';
import { expect } from 'chai';
import CarService from '../../../services/Car';
import { ServiceError } from '../../../services';
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

describe('Ao inserir um novo carro', () => {
  let result: Car | ServiceError | null;

  before(async () => {
    const carService = new CarService();
    sinon.stub(mongoose.Model, 'create').resolves(validCar);
    result = await carService.create(validCar);
  });

  after(() => {
    sinon.restore();
  });

  it('testa a função create do Service ao informar todos os dados corretamente', () => {
    expect(result).to.have.property('_id');
  });
});

describe('Consulta todos os carros cadastrados no banco de dados', () => {
  let result: Car[] | null;

  before(async () => {
    const carService = new CarService();
    sinon.stub(mongoose.Model, 'find').resolves([validCar]);
    result = await carService.read();
  });

  after(() => {
    sinon.restore();
  });

  it('testa a função read do Service ao informar todos os dados corretamente', () => {
    expect(result).to.be.an('array');
    expect(result).to.have.lengthOf(1);
  });
});

describe('Consulta um carro no banco de dados', () => {
  let result: Car | ServiceError | null;

  before(async () => {
    const carService = new CarService();
    sinon.stub(mongoose.Model, 'findOne').resolves(validCar);
    result = await carService.readOne(id);
  });

  after(() => {
    sinon.restore();
  });

  it('testa a função readOne do Service ao informar o ID correto', () => {
    expect(result).to.have.property('_id');
  });
});

describe('Altera um carro no banco de dados', () => {
  let result: Car | ServiceError | null;

  before(async () => {
    const carService = new CarService();
    sinon.stub(mongoose.Model, 'findOneAndUpdate').resolves(validCarUpdated);
    result = await carService.update(id, validCar);
  });

  after(() => {
    sinon.restore();
  });

  it('testa a função readOne do Service ao informar todos os dados corretamente', () => {
    expect(result).to.have.property('_id');
  });
});

describe('Remove um carro no banco de dados', () => {
  let result: Car | null;

  before(async () => {
    const carService = new CarService();
    sinon.stub(mongoose.Model, 'findOneAndDelete').resolves(validCar);
    result = await carService.delete(id);
  });

  after(() => {
    sinon.restore();
  });

  it('testa a função delete do Service ao informar o ID correto', () => {
    expect(result).to.have.property('_id');
  });
});
