import { useState } from 'react'
import { ButtonCalculator } from './components/ButtonCalculator'

import {
  Calc,
  Container,
  ContainerButtons,
  ContainerResult,
  ContainerTop,
  Result
} from './styles'

interface CalculatorProps {
  historic: string
  value1: number
  value2: number
  valueEntered: number
  typeCalculation: string
  comma: boolean
  valueAfterComma: string
}

export function Calculator() {
  const [calculation, setCalculation] = useState<CalculatorProps>({
    historic: '',
    value1: 0,
    value2: 0,
    valueEntered: 0,
    typeCalculation: '',
    comma: false,
    valueAfterComma: ''
  })
  const variavel = '÷ | x | - | + | ='

  const maxNumber = 10

  function checkComma() {
    let result = ''
    if (
      calculation.comma &&
      !calculation.valueEntered.toString().includes('.')
    ) {
      result = '.'
    }
    return result
  }

  function formattedStringforNumber(value: number) {
    let valueFormatted = Number(value).toLocaleString('pt-BR', {
      maximumFractionDigits: maxNumber
    })

    if (calculation.comma) {
      if (!value.toString().includes('.')) {
        valueFormatted = valueFormatted + ','
      }

      valueFormatted = valueFormatted + calculation.valueAfterComma
    }

    return valueFormatted
  }

  function handleClearValueEntred() {
    setCalculation(prevState => ({
      ...prevState,
      valueEntered: 0,
      comma: false,
      valueAfterComma: ''
    }))
  }

  function handleClearAll() {
    setCalculation({
      historic: '',
      value1: 0,
      value2: 0,
      valueEntered: 0,
      typeCalculation: '',
      comma: false,
      valueAfterComma: ''
    })
  }

  function handleAddNumber(value: number) {
    const totalNumbers =
      (calculation.valueEntered.toString() + calculation.valueAfterComma)
        .length + 1

    if (totalNumbers <= maxNumber) {
      let valueAfterComma = ''
      let valueEntered = 0

      if (!calculation.comma) {
        valueAfterComma = ''
        valueEntered = Number(calculation.valueEntered + '' + value)
      } else if (calculation.comma && value === 0) {
        valueAfterComma = calculation.valueAfterComma + value
        valueEntered = Number(calculation.valueEntered)
      } else if (calculation.comma && value != 0) {
        valueAfterComma = ''

        if (calculation.valueEntered.toString().includes('.')) {
          valueEntered = Number(
            calculation.valueEntered + calculation.valueAfterComma + value
          )
        } else {
          valueEntered = Number(
            calculation.valueEntered + '.' + calculation.valueAfterComma + value
          )
        }
      }

      setCalculation(prevState => ({
        ...prevState,
        valueEntered,
        valueAfterComma
      }))
    }
  }

  function handleAddComma() {
    setCalculation(prevState => ({
      ...prevState,
      comma: true
    }))
  }

  return (
    <Container>
      <ContainerTop>
        <Calc>{calculation.historic}</Calc>
        <ContainerResult>
          <Result>{formattedStringforNumber(calculation.valueEntered)}</Result>
        </ContainerResult>
      </ContainerTop>
      <ContainerButtons>
        <ButtonCalculator
          onPress={() => handleClearAll()}
          variant="graydark"
          typeButtom="CE"
          textColor="violet"
        />
        <ButtonCalculator
          onPress={() => handleClearValueEntred()}
          variant="graydark"
          typeButtom="C"
        />
        <ButtonCalculator variant="graydark" typeButtom="percentage" />
        <ButtonCalculator variant="violetdark" typeButtom="divided" />
        <ButtonCalculator
          onPress={() => handleAddNumber(7)}
          variant="graydark"
          typeButtom="7"
        />
        <ButtonCalculator
          onPress={() => handleAddNumber(8)}
          variant="graydark"
          typeButtom="8"
        />
        <ButtonCalculator
          onPress={() => handleAddNumber(9)}
          variant="graydark"
          typeButtom="9"
        />
        <ButtonCalculator variant="violetdark" typeButtom="times" />
        <ButtonCalculator
          onPress={() => handleAddNumber(4)}
          variant="graydark"
          typeButtom="4"
        />
        <ButtonCalculator
          onPress={() => handleAddNumber(5)}
          variant="graydark"
          typeButtom="5"
        />
        <ButtonCalculator
          onPress={() => handleAddNumber(6)}
          variant="graydark"
          typeButtom="6"
        />
        <ButtonCalculator variant="violetdark" typeButtom="minus" />
        <ButtonCalculator
          onPress={() => handleAddNumber(1)}
          variant="graydark"
          typeButtom="1"
        />
        <ButtonCalculator
          onPress={() => handleAddNumber(2)}
          variant="graydark"
          typeButtom="2"
        />
        <ButtonCalculator
          onPress={() => handleAddNumber(3)}
          variant="graydark"
          typeButtom="3"
        />
        <ButtonCalculator variant="violetdark" typeButtom="sum" />
        <ButtonCalculator variant="graydark" typeButtom="sumandminus" />
        <ButtonCalculator
          onPress={() => handleAddNumber(0)}
          variant="graydark"
          typeButtom="0"
        />
        <ButtonCalculator
          onPress={() => handleAddComma()}
          variant="graydark"
          typeButtom=","
        />
        <ButtonCalculator variant="violetlight" typeButtom="equals" />
      </ContainerButtons>
    </Container>
  )
}
