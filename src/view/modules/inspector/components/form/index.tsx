import React, { FC } from 'react'

import './style.less'

export interface FormProps {
  children: JSX.Element | Array<JSX.Element>
}

export const Form: FC<FormProps> = ({ children }) => (
  <div className="form">
    {children}
  </div>
)