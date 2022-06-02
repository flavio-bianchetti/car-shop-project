import * as sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../server';
import mongoose from 'mongoose';

chai.use(chaiHttp);

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

  before(async () => {
    sinon.stub(mongoose.Model, 'create').resolves(validCar as any);
  });

  after(() => {
    sinon.restore();
  });

  it('testa a função create do Controller ao informar todos os dados corretamente', async () => {
    const chaiHttpResponse = await chai.
    request(server.getApp())
      .post('/cars')
      .send(validCar);
      expect(chaiHttpResponse).to.have.status(201);
  });
});

describe('Consulta todos os carros cadastrados no banco de dados', () => {

  before(() => {
    sinon.stub(mongoose.Model, 'find').resolves([validCar] as any);
  });

  after(() => {
    sinon.restore();
  });

  it('testa a função read do Controller ao informar todos os dados corretamente', async () => {
    const chaiHttpResponse = await chai
      .request(server.getApp())
      .get('/cars');
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.an('array');
  });
});

describe('Consulta um carro no banco de dados', () => {

  before(() => {
    sinon.stub(mongoose.Model, 'findOne').resolves(validCar as any);
  });

  after(() => {
    sinon.restore();
  });

  it('testa a função readOne do Controller ao informar o ID correto', async () => {
    const chaiHttpResponse = await chai
      .request(server.getApp())
      .get(`/cars/${id}`);
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.have.property('_id');
  });
});

describe('Altera um carro no banco de dados', () => {

  before(() => {
    sinon.stub(mongoose.Model, 'findOneAndUpdate').resolves(validCarUpdated as any);
  });

  after(() => {
    sinon.restore();
  });

  it('testa a função update do Controller ao informar todos os dados corretamente', async () => {
    const chaiHttpResponse = await chai
      .request(server.getApp())
      .put(`/cars/${id}`)
      .send(validCar);
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body.model).to.be.equal('Opala Nervoso');
    expect(chaiHttpResponse.body.year).to.be.equal(1960);
    expect(chaiHttpResponse.body.color).to.be.equal('black');
  });
});

describe('Remove um carro no banco de dados', () => {

  before(() => {
    sinon.stub(mongoose.Model, 'findOneAndDelete').resolves(validCar as any);
  });

  after(() => {
    sinon.restore();
  });

  it('testa a função delete do Controller ao informar o ID correto', async () => {
    const chaiHttpResponse = await chai
      .request(server.getApp())
      .delete(`/cars/${id}`);
    expect(chaiHttpResponse).to.have.status(204);
  });
});
