import React from 'react';
import { Button, Header } from 'semantic-ui-react';

const EmptyMessage = ({ message }) => {
  const centerProps = {
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      minHeight: '100vh',
      marginTop: '-10vh',
    },
  };

  const messageProps = {
    as: 'h3',
    textAlign: 'center',
    color: 'violet',
    content: message,
    style: { padding: '20px 0' },
  };

  const buttonProps = {
    icon: 'plus',
    type: 'button',
    color: 'violet',
    content: 'New Crawl',
    onClick: () => { window.location.hash = '/'; },
  };

  return (
    <div {...centerProps}>
      <Header {...messageProps} />
      <Button {...buttonProps} />
    </div>
  );
};

export default EmptyMessage;
