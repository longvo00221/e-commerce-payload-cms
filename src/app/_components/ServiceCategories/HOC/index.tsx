import Service from '../Service'

type WithPriceProps = {
  price: string
}

function withPrice<P extends object>(WrappedComponent: React.ComponentType<P>) {
  return (props: Omit<P, 'price'>) => {
    return <WrappedComponent {...(props as P)} price="contact" />
  }
}

const ServiceWithPrice = withPrice(Service)

export default ServiceWithPrice
