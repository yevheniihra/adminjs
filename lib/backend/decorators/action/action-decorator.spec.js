"use strict";

var _chai = require("chai");
var _sinon = _interopRequireDefault(require("sinon"));
var _actionDecorator = _interopRequireDefault(require("./action-decorator"));
var _adminjs = _interopRequireDefault(require("../../../adminjs"));
var _baseResource = _interopRequireDefault(require("../../adapters/resource/base-resource"));
var _forbiddenError = _interopRequireDefault(require("../../utils/errors/forbidden-error"));
var _validationError = _interopRequireDefault(require("../../utils/errors/validation-error"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable @typescript-eslint/explicit-function-return-type */

describe('ActionDecorator', function () {
  const request = {
    response: true
  };
  let admin;
  let resource;
  let context;
  let action;
  let handler;
  beforeEach(function () {
    admin = _sinon.default.createStubInstance(_adminjs.default);
    resource = _sinon.default.createStubInstance(_baseResource.default);
    action = {
      name: 'myAction'
    };
    context = {
      resource,
      _admin: admin,
      action
    };
    handler = _sinon.default.stub();
  });
  afterEach(function () {
    _sinon.default.restore();
  });
  describe('#before', function () {
    it('calls all functions if they were given as an array', async function () {
      // 3 hooks one adding response1 key and the other adding response2 key
      // and finally one async adding response3
      const before = [() => ({
        response1: true
      }), response => ({
        ...response,
        response2: true
      }), async response => ({
        ...response,
        response3: true
      })];
      const decorator = new _actionDecorator.default({
        action: {
          before,
          handler,
          name: 'myAction',
          actionType: 'resource'
        },
        admin,
        resource
      });
      const ret = await decorator.invokeBeforeHook({}, {});
      (0, _chai.expect)(ret).to.deep.eq({
        response1: true,
        response2: true,
        response3: true
      });
    });
  });
  describe('#after', function () {
    it('calls all functions if they were given as an array', async function () {
      // 2 hooks one adding response1 key and the other adding response2 key
      const after = [() => ({
        response1: true
      }), response => ({
        ...response,
        response2: true
      }), async response => ({
        ...response,
        response3: true
      })];
      const decorator = new _actionDecorator.default({
        action: {
          after,
          handler,
          name: 'myAction',
          actionType: 'resource'
        },
        admin,
        resource
      });
      const ret = await decorator.invokeAfterHook({}, {}, {});
      (0, _chai.expect)(ret).to.deep.eq({
        response1: true,
        response2: true,
        response3: true
      });
    });
  });
  describe('#handler', function () {
    it('calls the before action when it is given', async function () {
      const mockedRequest = {
        response: true
      };
      const before = _sinon.default.stub().returns(mockedRequest);
      const decorator = new _actionDecorator.default({
        action: {
          before,
          handler,
          name: 'myAction',
          actionType: 'resource'
        },
        admin,
        resource
      });
      await decorator.handler(request, 'res', context);
      (0, _chai.expect)(before).to.have.been.calledWith(request);
      (0, _chai.expect)(handler).to.have.been.calledWith(_sinon.default.match(mockedRequest));
    });
    it('calls the after action when it is given', async function () {
      const modifiedData = {
        records: false
      };
      const data = {};
      const after = _sinon.default.stub().returns(modifiedData);
      handler = handler.resolves(data);
      const decorator = new _actionDecorator.default({
        action: {
          name: 'myAction',
          handler,
          after,
          actionType: 'resource'
        },
        admin,
        resource
      });
      const ret = await decorator.handler(request, 'res', context);
      (0, _chai.expect)(ret).to.equal(modifiedData);
      (0, _chai.expect)(handler).to.have.been.called;
      (0, _chai.expect)(after).to.have.been.calledWith(data);
    });
    it('returns forbidden error when its thrown', async function () {
      const errorMessage = 'you cannot edit this resource';
      const before = _sinon.default.stub().throws(new _forbiddenError.default(errorMessage));
      const decorator = new _actionDecorator.default({
        action: {
          before,
          handler,
          name: 'myAction',
          actionType: 'record'
        },
        admin,
        resource
      });
      const ret = await decorator.handler(request, 'res', context);
      (0, _chai.expect)(before).to.have.been.calledWith(request);
      (0, _chai.expect)(ret).to.have.property('notice');
      (0, _chai.expect)(ret.notice).to.deep.equal({
        message: errorMessage,
        type: 'error'
      });
      (0, _chai.expect)(handler).not.to.have.been.called;
    });
    it('returns record with validation errors when they are thrown', async function () {
      const errors = {
        email: {
          message: 'Wrong email',
          type: 'notGood'
        }
      };
      const notice = {
        message: 'There are validation errors',
        type: 'validationError'
      };
      const before = _sinon.default.stub().throws(new _validationError.default(errors, notice));
      const decorator = new _actionDecorator.default({
        action: {
          before,
          handler,
          name: 'myAction',
          actionType: 'record'
        },
        admin,
        resource
      });
      const ret = await decorator.handler(request, 'res', context);
      (0, _chai.expect)(before).to.have.been.calledWith(request);
      (0, _chai.expect)(ret).to.have.property('notice');
      (0, _chai.expect)(ret.notice).to.deep.equal({
        message: notice.message,
        type: 'error'
      });
      (0, _chai.expect)(ret).to.have.property('record');
      (0, _chai.expect)(ret.record).to.have.property('errors');
      (0, _chai.expect)(ret.record.errors).to.deep.equal(errors);
      (0, _chai.expect)(handler).not.to.have.been.called;
    });
  });
});