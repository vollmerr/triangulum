import * as historyStorage from '../historyStorage';

let id1;
let id2;
let item;
// order of tests matter, updates localStorage as they are processed
describe('historyStorage', () => {
  it('should initalize to a stringified empty object', () => {
    localStorage.clear();
    historyStorage.init();
    expect(localStorage.getItem('crawlHistory')).toEqual(JSON.stringify({}));
  });

  it('should add new items with the created date, and return the id of the new item', () => {
    id1 = historyStorage.newItem();
    item = historyStorage.getItem({ id: id1 });
    expect(item).toBeDefined();
    expect(item.created).toBeDefined();
  });

  it('should not override existing items when adding more', () => {
    id2 = historyStorage.newItem();
    item = historyStorage.getItem({ id: id2 });
    expect(item).toBeDefined(); // new item added
    item = historyStorage.getItem({ id: id1 });
    expect(item).toBeDefined(); // old item still exists
  });

  it('should get all items added', () => {
    const items = historyStorage.getItems();
    expect(items[id1]).toBeDefined();
    expect(items[id2]).toBeDefined();
  });

  it('should update items with a updated date, without overriding exisitng values', () => {
    const value = { test: 'a' };
    historyStorage.updateItem({ id: id1, value });
    item = historyStorage.getItem({ id: id1 });
    expect(item.created).toBeDefined(); // didnt override
    expect(item.value.test).toBe('a'); // new value added
    expect(item.updated).toBeDefined(); // attached updated date
  });

  it('should not override an existing history when initalizing', () => {
    historyStorage.init();
    item = historyStorage.getItem({ id: id1 });
    expect(item.value.test).toBe('a');
  });

  it('should reset to a stringified empty object', () => {
    historyStorage.reset();
    expect(localStorage.getItem('crawlHistory')).toEqual(JSON.stringify({}));
  });
});
