import React from 'react'
import { Gutter } from '../Gutter'
import Image from 'next/image'
import { inclusions } from '../../constants'
const Benefits = () => {
  return (
    <section>
      <Gutter className="!mx-0 !px-0">
        <h3 className="font-semibold text-3xl">Why choose us ?</h3>
        <ul className="grid justify-center gap-8 p-0 md:grid-cols-4 lg:grid-cols-2 sm:grid-cols-1 md:my-10 ">
          {inclusions.map((item, index) => (
            <li key={item.title}>
              <Image
                className="mb-4"
                src={item.icon}
                alt={item.title}
                width={36}
                height={36}
                loading="lazy"
              />
              <h5>{item.title}</h5>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      </Gutter>
    </section>
  )
}
export default Benefits
