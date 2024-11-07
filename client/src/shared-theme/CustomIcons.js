import * as React from 'react';
import mainLogo from '../assets/logo.png'
// import SvgIcon from '@mui/material/SvgIcon';
import '../App.css'

export function SitemarkIcon(props) {
  return (
    <div className={props.className}>
      <img src={mainLogo} alt="mainLogo" width={props.width} />
    </div>
  );
}
