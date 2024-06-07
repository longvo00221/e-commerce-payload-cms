import { Field } from 'payload/types'
import InputField from './inputField'
import Cell from './cell'

export const validateHexColor = (value: string): true | string => {
  const isValid = /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(value)
  return isValid ? true : `${value} is not a valid hex color`
}

const colorField: Field = {
  name: 'color',
  type: 'text',
  validate: validateHexColor,
  required: true,
  admin: {
    components: {
      Field: InputField,
      Cell,
    },
  },
}

export default colorField
