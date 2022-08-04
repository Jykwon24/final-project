import React from 'react';
const styles = {
  page: {
    maxHeight: 'calc(70vh - 3.5rem)',
    overflow: 'auto',
    maxWidth: '95%'
  }
};

export default function PageContent({ children }) {

  return (
    <>
      <div className='container mt-2' style={styles.page}>
        { children }
      </div>
    </>
  );
}
