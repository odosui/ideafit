import * as React from 'react'

const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean
    type?: 'submit' | 'button'
  }
> = ({ loading = false, type = 'button', className, children, ...attrs }) => {
  const classes: string = `${className} ${loading ? 'loading' : ''}`
  return (
    <button {...attrs} className={classes} type={type}>
      {loading ? <div className="spinner2" /> : children}
    </button>
  )
}

export default Button
