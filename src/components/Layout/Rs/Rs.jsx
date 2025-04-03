import React from 'react';
import s from './Rs.module.scss';
import { AiFillInstagram } from "react-icons/ai";
import { AiFillGithub } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";

function Rs() {
  return (
    <div className={s.rs}>
      <div className={`${s.lineRs} ${s.long}`}></div>
      <a href="#"><AiFillLinkedin /></a>

      <div className={`${s.lineRs} ${s.short}`}></div>
      <a href="#"><AiFillGithub /></a>

      <div className={`${s.lineRs} ${s.short}`}></div>
      <a href="#"><AiFillInstagram /></a>
    </div>
  );
}

export default Rs;
