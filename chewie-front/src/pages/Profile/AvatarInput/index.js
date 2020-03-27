import React from 'react';
// import { useField } from '@rocketseat/unform';

import { Container } from './styles';

export default function AvatarInput() {
  function handleChange(e) {

  }
  return (
    <Container>
      <label htmlFor="">
      <img
              src={
                'https://api.adorable.io/avatars/60/abott@adorable.png'
              }
              alt="Test User"
            />

        <input 
          type="file"
          id="avatar"
          accept="image/*"
          onChange={handleChange} 
        />
      </label>
    </Container>
  );
}