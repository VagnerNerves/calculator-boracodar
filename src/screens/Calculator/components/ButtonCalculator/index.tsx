import { TouchableOpacityProps } from 'react-native'

import {
  Button,
  TextButton,
  ButtonVariant,
  IconPercent,
  IconDivided,
  IconTimes,
  IconMinus,
  IconSum,
  IconEquals,
  IconSumAndMinus,
  TextButtonColor
} from './styles'

interface Props extends TouchableOpacityProps {
  variant: ButtonVariant
  typeButtom:
    | 'CE'
    | 'C'
    | 'percentage'
    | 'divided'
    | 'times'
    | 'minus'
    | 'sum'
    | 'equals'
    | 'sumandminus'
    | ','
    | '0'
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
  textColor?: TextButtonColor
}

export function ButtonCalculator({
  variant,
  typeButtom,
  textColor = 'write',
  ...Props
}: Props) {
  return (
    <Button variant={variant} {...Props}>
      {typeButtom === 'CE' && <TextButton colortext={textColor}>CE</TextButton>}
      {typeButtom === 'C' && <TextButton colortext={textColor}>C</TextButton>}
      {typeButtom === 'percentage' && <IconPercent />}
      {typeButtom === 'divided' && <IconDivided />}
      {typeButtom === 'times' && <IconTimes />}
      {typeButtom === 'minus' && <IconMinus />}
      {typeButtom === 'sum' && <IconSum />}
      {typeButtom === 'equals' && <IconEquals />}
      {typeButtom === 'sumandminus' && <IconSumAndMinus />}
      {typeButtom === ',' && <TextButton colortext={textColor}>,</TextButton>}
      {typeButtom === '0' && <TextButton colortext={textColor}>0</TextButton>}
      {typeButtom === '1' && <TextButton colortext={textColor}>1</TextButton>}
      {typeButtom === '2' && <TextButton colortext={textColor}>2</TextButton>}
      {typeButtom === '3' && <TextButton colortext={textColor}>3</TextButton>}
      {typeButtom === '4' && <TextButton colortext={textColor}>4</TextButton>}
      {typeButtom === '5' && <TextButton colortext={textColor}>5</TextButton>}
      {typeButtom === '6' && <TextButton colortext={textColor}>6</TextButton>}
      {typeButtom === '7' && <TextButton colortext={textColor}>7</TextButton>}
      {typeButtom === '8' && <TextButton colortext={textColor}>8</TextButton>}
      {typeButtom === '9' && <TextButton colortext={textColor}>9</TextButton>}
    </Button>
  )
}
