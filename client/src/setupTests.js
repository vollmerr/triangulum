/* eslint-disable import/no-extraneous-dependencies */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MockDate from 'mockdate';

configure({ adapter: new Adapter() });
// hard code dates (snapshots...)
MockDate.set('1/1/2000');

// make uuids return deterministic value
jest.mock('uuid/v4', () => {
  const faker = require('faker'); // eslint-disable-line
  faker.seed(1337);
  return () => faker.random.uuid();
});

jest.mock('./utils/socket');
