import uuid from 'uuid/v4';

// NOTE: all the things are stored as strings in localStorage...

export const getItems = () => JSON.parse(localStorage.getItem('crawlHistory'));

export const getItem = ({ id }) => getItems()[id];

export const newItem = () => {
  const id = uuid();
  const crawlHistory = JSON.stringify({
    ...getItems(),
    [id]: {
      created: new Date(),
    },
  });
  localStorage.setItem('crawlHistory', crawlHistory);
  return id;
};

export const updateItem = ({ id, ...item }) => {
  const crawlHistory = JSON.stringify({
    ...getItems(),
    [id]: {
      ...getItem({ id }),
      ...item,
      updated: new Date(),
    },
  });
  localStorage.setItem('crawlHistory', crawlHistory);
};

export const reset = () => {
  const crawlHistory = JSON.stringify({});
  localStorage.setItem('crawlHistory', crawlHistory);
};

export const init = () => {
  if (!localStorage.getItem('crawlHistory')) {
    reset();
  }
};
