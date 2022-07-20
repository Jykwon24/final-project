import React from 'react';
const styles = {
  page: {
    minHeight: 'calc(75vh - 3.5rem)'
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
