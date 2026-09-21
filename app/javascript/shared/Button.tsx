import * as React from 'react'

const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean
    type?: 'submit' | 'button'
  }
> = ({ loading = false, type = 'button', className, children, ...attrs }) => {
  const classes = ['btn', className, loading && 'btn--loading']
    .filter(Boolean)
    .join(' ')
  return (
    <button {...attrs} className={classes} type={type}>
      {loading ? <div className="spinner-bars" /> : children}
    </button>
  )
}

export default Button
