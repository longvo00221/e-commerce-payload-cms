import React from 'react'

import serialize from './serialize'

import classes from './index.module.scss'

const RichText: React.FC<{ className?: string; content: any; isHalf?: boolean }> = ({
  className,
  content,
  isHalf,
}) => {
  if (!content) {
    return null
  }

  return (
    <div
      className={[classes.richText, className, isHalf ? 'w-1/2' : 'w-full']
        .filter(Boolean)
        .join(' ')}
    >
      {serialize(content)}
    </div>
  )
}

export default RichText
