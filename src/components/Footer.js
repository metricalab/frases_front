import React from 'react';
import logo from './../metricaLogo.jpg';

const Footer = () => {
  return (
    <footer className='page-footer black'>
      <div className='container'>
        <div className='row'>
          <div className='col l6 s12'>
            <img src={logo} alt='Logo' />
            <h5 className='white-text'>Metrica S.L</h5>
          </div>
        </div>
      </div>
      <div className='footer-copyright metrica-color2'>
        <div className='container '>
          <a className='grey-text text-lighten-4 right' href='#!'>
            Metrica consulting
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
