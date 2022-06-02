import * as sinon from 'sinon';
import { expect } from 'chai';
import CarService from '../../../services/Car';
import { ServiceError } from '../../../services';
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

describe('Ao inserir um novo carro', () => {
  let result: Car | ServiceError | null;

  before(async () => {
    const service = new CarService();
    sinon.stub(service, 'create').resolves(validCar);
    result = await service.create(validCar);
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
    const service = new CarService();
    sinon.stub(service, 'read').resolves([validCar]);
    result = await service.read();
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
    const service = new CarService();
    sinon.stub(service, 'readOne').resolves(validCar);
    result = await service.readOne(id.toString());
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
    const service = new CarService();
    sinon.stub(service, 'update').resolves(validCarUpdated);
    result = await service.update(id.toString(), validCar);
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
    const service = new CarService();
    sinon.stub(service, 'delete').resolves(validCar);
    result = await service.delete(id.toString());
  });

  after(() => {
    sinon.restore();
  });

  it('testa a função delete do Service ao informar o ID correto', () => {
    expect(result).to.have.property('_id');
  });
});
