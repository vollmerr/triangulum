import uuid from 'uuid/v4';

// NOTE: all the things are stored as strings in localStorage...

export const getItems = () => JSON.parse(localStorage.getItem('crawlHistory'));

export const getItem = ({ id }) => getItems()[id];

export const getCurrent = () => {
  const id = localStorage.getItem('crawlId');
  return id ? getItem({ id }) : {};
};

export const setCurrent = ({ id }) => localStorage.setItem('crawlId', id);

export const newItem = () => {
  const id = uuid();
  const crawlHistory = JSON.stringify({
    ...getItems(),
    [id]: {
      id,
      created: new Date(),
    },
  });
  localStorage.setItem('crawlHistory', crawlHistory);
  localStorage.setItem('crawlId', id);
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
  localStorage.setItem('crawlId', '');
};

export const init = () => {
  if (!localStorage.getItem('crawlHistory')) {
    reset();
  }
};
