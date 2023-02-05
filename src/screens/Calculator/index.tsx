import { useState } from 'react'

import { ButtonCalculator } from './components/ButtonCalculator'

import {
  Calc,
  Container,
  ContainerButtons,
  ContainerResult,
  ContainerTop,
  IconDivided,
  IconEquals,
  IconMinus,
  IconSum,
  IconTimes,
  Result
} from './styles'

type TypeCalculation = '' | 'divided' | 'times' | 'minus' | 'sum' | 'equals'

interface CalculatorProps {
  historic: string
  value1: number | null
  value2: number | null
  valueEntered: number
  typeCalculation: TypeCalculation
  lastTypeCalculation: TypeCalculation
  comma: boolean
  valueAfterComma: string
}

const signalTypeCalculator = {
  divided: '÷',
  times: 'x',
  minus: '-',
  sum: '+',
  equals: '='
} as const

export function Calculator() {
  const [calculation, setCalculation] = useState<CalculatorProps>({
    historic: '',
    value1: null,
    value2: null,
    valueEntered: 0,
    typeCalculation: '',
    lastTypeCalculation: '',
    comma: false,
    valueAfterComma: ''
  })

  const maxNumber = 10

  function formattedStringforNumber(value: number, checkComa: boolean = false) {
    let valueFormatted = Number(value).toLocaleString('pt-BR', {
      maximumFractionDigits: maxNumber,
      maximumSignificantDigits: maxNumber
    })

    if (calculation.comma && checkComa) {
      if (!value.toString().includes('.')) {
        valueFormatted = valueFormatted + ','
      }

      valueFormatted = valueFormatted + calculation.valueAfterComma
    }

    return valueFormatted
  }

  function AdjustEquals() {
    if (calculation.typeCalculation === 'equals') {
      let historic = calculation.historic
      let calcTotal = 0

      if (
        calculation.lastTypeCalculation === 'sum' ||
        calculation.lastTypeCalculation === 'minus' ||
        calculation.lastTypeCalculation === 'times' ||
        calculation.lastTypeCalculation === 'divided'
      ) {
        if (calculation.value1 && calculation.value2) {
          if (calculation.lastTypeCalculation === 'sum') {
            calcTotal = calculation.value1 + calculation.value2
          } else if (calculation.lastTypeCalculation === 'minus') {
            calcTotal = calculation.value1 - calculation.value2
          }
          if (calculation.lastTypeCalculation === 'times') {
            calcTotal = calculation.value1 * calculation.value2
          }
          if (calculation.lastTypeCalculation === 'divided') {
            calcTotal = calculation.value1 / calculation.value2
          }
        }

        historic =
          historic +
          ' ' +
          signalTypeCalculator[calculation.typeCalculation] +
          ' ' +
          formattedStringforNumber(calcTotal) +
          ' | '
      }

      setCalculation(prevState => ({
        ...prevState,
        historic,
        typeCalculation: '',
        valueEntered: 0,
        comma: false,
        valueAfterComma: ''
      }))

      return true
    }

    return false
  }

  function valueReturnsTotal() {
    let calcTotal = 0

    if (
      calculation.lastTypeCalculation === 'sum' ||
      calculation.lastTypeCalculation === 'minus' ||
      calculation.lastTypeCalculation === 'times' ||
      calculation.lastTypeCalculation === 'divided'
    ) {
      if (calculation.value1 && calculation.value2) {
        if (calculation.lastTypeCalculation === 'sum') {
          calcTotal = calculation.value1 + calculation.value2
        } else if (calculation.lastTypeCalculation === 'minus') {
          calcTotal = calculation.value1 - calculation.value2
        }
        if (calculation.lastTypeCalculation === 'times') {
          calcTotal = calculation.value1 * calculation.value2
        }
        if (calculation.lastTypeCalculation === 'divided') {
          calcTotal = calculation.value1 / calculation.value2
        }
      }
    }

    return calcTotal
  }

  function handleClearValueEntred() {
    AdjustEquals()

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
      value1: null,
      value2: null,
      valueEntered: 0,
      typeCalculation: '',
      lastTypeCalculation: '',
      comma: false,
      valueAfterComma: ''
    })
  }

  function handleAddNumber(value: number) {
    let valueAfterComma = ''
    let valueEntered = 0
    let comma = false
    if (!AdjustEquals()) {
      valueAfterComma = calculation.valueAfterComma
      valueEntered = calculation.valueEntered
      comma = calculation.comma
    }

    const totalNumbers = (valueEntered.toString() + valueAfterComma).length + 1

    if (totalNumbers <= maxNumber) {
      let value2 = calculation.value2

      if (calculation.value1 && calculation.value2 === null) {
        valueEntered = value
        value2 = 0
      } else if (!comma) {
        valueAfterComma = ''
        valueEntered = Number(valueEntered + '' + value)
      } else if (comma && value === 0) {
        valueAfterComma = valueAfterComma + value
        valueEntered = Number(valueEntered)
      } else if (comma && value != 0) {
        valueAfterComma = ''

        if (valueEntered.toString().includes('.')) {
          valueEntered = Number(valueEntered + valueAfterComma + value)
        } else {
          valueEntered = Number(valueEntered + '.' + valueAfterComma + value)
        }
      }

      return setCalculation(prevState => ({
        ...prevState,
        value2,
        valueEntered,
        valueAfterComma
      }))
    }

    return calculation
  }

  function handleAddComma() {
    let valueEntered = 0
    let value2 = calculation.value2
    let valueAfterComma = calculation.valueAfterComma

    if (!AdjustEquals()) {
      valueAfterComma = ''
      valueEntered = calculation.valueEntered
    }

    if (calculation.value1 && calculation.value2 === null) {
      valueEntered = 0
      value2 = 0
    }

    setCalculation(prevState => ({
      ...prevState,
      value2,
      valueEntered,
      comma: true,
      valueAfterComma
    }))
  }

  function handleCalculation(typeCalc: TypeCalculation) {
    switch (typeCalc) {
      case 'equals': {
        if (
          calculation.typeCalculation === '' &&
          calculation.lastTypeCalculation === ''
        ) {
          return calculation
        }

        if (
          calculation.typeCalculation === '' &&
          calculation.lastTypeCalculation != ''
        ) {
          let historic = calculation.historic
          let calc = 0

          if (
            calculation.lastTypeCalculation === 'sum' ||
            calculation.lastTypeCalculation === 'minus' ||
            calculation.lastTypeCalculation === 'times' ||
            calculation.lastTypeCalculation === 'divided'
          ) {
            if (calculation.value2) {
              if (calculation.lastTypeCalculation === 'sum') {
                calc = calculation.valueEntered + calculation.value2
              } else if (calculation.lastTypeCalculation === 'minus') {
                calc = calculation.valueEntered - calculation.value2
              }
              if (calculation.lastTypeCalculation === 'times') {
                calc = calculation.valueEntered * calculation.value2
              }
              if (calculation.lastTypeCalculation === 'divided') {
                calc = calculation.valueEntered / calculation.value2
              }
            }

            let value2Formatted = '0'
            if (calculation.value2) {
              value2Formatted = formattedStringforNumber(calculation.value2)
            }

            historic =
              historic +
              formattedStringforNumber(calculation.valueEntered) +
              ' ' +
              signalTypeCalculator[calculation.lastTypeCalculation] +
              ' ' +
              value2Formatted
          }

          const newCalculation: CalculatorProps = {
            historic,
            value1: calculation.valueEntered,
            value2: calculation.value2,
            valueEntered: calc,
            typeCalculation: typeCalc,
            lastTypeCalculation: calculation.lastTypeCalculation,
            comma: false,
            valueAfterComma: ''
          }

          return setCalculation(newCalculation)
        }

        if (
          calculation.typeCalculation === 'sum' ||
          calculation.typeCalculation === 'minus' ||
          calculation.typeCalculation === 'times' ||
          calculation.typeCalculation === 'divided'
        ) {
          let calc = 0

          if (calculation.value1) {
            if (calculation.typeCalculation === 'sum') {
              calc = calculation.value1 + calculation.valueEntered
            } else if (calculation.typeCalculation === 'minus') {
              calc = calculation.value1 - calculation.valueEntered
            }
            if (calculation.typeCalculation === 'times') {
              calc = calculation.value1 * calculation.valueEntered
            }
            if (calculation.typeCalculation === 'divided') {
              calc = calculation.value1 / calculation.valueEntered
            }
          }

          const historic =
            calculation.historic +
            ' ' +
            signalTypeCalculator[calculation.typeCalculation] +
            ' ' +
            formattedStringforNumber(calculation.valueEntered)

          const newCalculation: CalculatorProps = {
            historic,
            value1: calculation.value1,
            value2: calculation.valueEntered,
            valueEntered: calc,
            typeCalculation: typeCalc,
            lastTypeCalculation: calculation.typeCalculation,
            comma: false,
            valueAfterComma: ''
          }

          return setCalculation(newCalculation)
        }

        if (calculation.typeCalculation === 'equals') {
          let historic = calculation.historic
          let calc = 0

          if (
            calculation.lastTypeCalculation === 'sum' ||
            calculation.lastTypeCalculation === 'minus' ||
            calculation.lastTypeCalculation === 'times' ||
            calculation.lastTypeCalculation === 'divided'
          ) {
            let calcTotal = 0

            if (calculation.value1 && calculation.value2) {
              if (calculation.lastTypeCalculation === 'sum') {
                calcTotal = calculation.value1 + calculation.value2
              } else if (calculation.lastTypeCalculation === 'minus') {
                calcTotal = calculation.value1 - calculation.value2
              }
              if (calculation.lastTypeCalculation === 'times') {
                calcTotal = calculation.value1 * calculation.value2
              }
              if (calculation.lastTypeCalculation === 'divided') {
                calcTotal = calculation.value1 / calculation.value2
              }
            }

            historic =
              historic +
              ' ' +
              signalTypeCalculator[calculation.typeCalculation] +
              ' ' +
              formattedStringforNumber(calcTotal) +
              ' | '

            if (calculation.value2) {
              if (calculation.lastTypeCalculation === 'sum') {
                calc = calculation.valueEntered + calculation.value2
              } else if (calculation.lastTypeCalculation === 'minus') {
                calc = calculation.valueEntered - calculation.value2
              }
              if (calculation.lastTypeCalculation === 'times') {
                calc = calculation.valueEntered * calculation.value2
              }
              if (calculation.lastTypeCalculation === 'divided') {
                calc = calculation.valueEntered / calculation.value2
              }
            }

            let value2Formatted = '0'
            if (calculation.value2) {
              value2Formatted = formattedStringforNumber(calculation.value2)
            }

            historic =
              historic +
              formattedStringforNumber(calculation.valueEntered) +
              ' ' +
              signalTypeCalculator[calculation.lastTypeCalculation] +
              ' ' +
              value2Formatted
          }

          const newCalculation: CalculatorProps = {
            historic,
            value1: calculation.valueEntered,
            value2: calculation.value2,
            valueEntered: calc,
            typeCalculation: typeCalc,
            lastTypeCalculation: calculation.lastTypeCalculation,
            comma: false,
            valueAfterComma: ''
          }

          return setCalculation(newCalculation)
        }

        return calculation
      }
      case 'divided':
      case 'times':
      case 'minus':
      case 'sum': {
        if (
          calculation.typeCalculation != '' &&
          calculation.typeCalculation != 'equals'
        ) {
          return setCalculation(prevState => ({
            ...prevState,
            typeCalculation: typeCalc
          }))
        }

        if (calculation.typeCalculation === '') {
          return setCalculation(prevState => ({
            ...prevState,
            value1: calculation.valueEntered,
            value2: null,
            typeCalculation: typeCalc,
            historic:
              calculation.historic +
              '' +
              formattedStringforNumber(calculation.valueEntered),
            comma: false,
            valueAfterComma: ''
          }))
        }

        if (calculation.typeCalculation === 'equals') {
          let historic = calculation.historic

          let calcTotal = 0

          if (calculation.value1 && calculation.value2) {
            if (calculation.lastTypeCalculation === 'sum') {
              calcTotal = calculation.value1 + calculation.value2
            } else if (calculation.lastTypeCalculation === 'minus') {
              calcTotal = calculation.value1 - calculation.value2
            }
            if (calculation.lastTypeCalculation === 'times') {
              calcTotal = calculation.value1 * calculation.value2
            }
            if (calculation.lastTypeCalculation === 'divided') {
              calcTotal = calculation.value1 / calculation.value2
            }
          }

          historic =
            historic +
            ' ' +
            signalTypeCalculator[calculation.typeCalculation] +
            ' ' +
            formattedStringforNumber(calcTotal) +
            ' | '

          historic =
            historic + formattedStringforNumber(calculation.valueEntered)

          const newCalculation: CalculatorProps = {
            historic,
            value1: calculation.valueEntered,
            value2: null,
            valueEntered: calculation.valueEntered,
            typeCalculation: typeCalc,
            lastTypeCalculation: calculation.lastTypeCalculation,
            comma: false,
            valueAfterComma: ''
          }

          return setCalculation(newCalculation)
        }

        return calculation
      }
      default:
        return calculation
    }
  }

  function handleNegativeOrPositive() {
    if (calculation.valueEntered === 0) {
      return calculation
    }

    return setCalculation(prevState => ({
      ...prevState,
      valueEntered: calculation.valueEntered * -1
    }))
  }

  function handlePercentage() {
    if (calculation.valueEntered === 0) {
      return calculation
    }

    let calc = calculation.valueEntered / 100
    if (
      calculation.value1 &&
      calculation.value1 != 0 &&
      calculation.value2 &&
      calculation.value2 != 0
    ) {
      calc = calc * valueReturnsTotal()
    } else if (calculation.value1 && calculation.value1 != 0) {
      calc = calc * calculation.value1
    }

    return setCalculation(prevState => ({
      ...prevState,
      valueEntered: calc
    }))
  }

  return (
    <Container>
      <ContainerTop>
        <Calc numberOfLines={1} ellipsizeMode="head">
          {calculation.historic}
        </Calc>
        <ContainerResult>
          {calculation.typeCalculation === 'divided' && <IconDivided />}
          {calculation.typeCalculation === 'times' && <IconTimes />}
          {calculation.typeCalculation === 'minus' && <IconMinus />}
          {calculation.typeCalculation === 'sum' && <IconSum />}
          {calculation.typeCalculation === 'equals' && <IconEquals />}
          <Result>
            {formattedStringforNumber(calculation.valueEntered, true)}
          </Result>
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
        <ButtonCalculator
          onPress={() => handlePercentage()}
          variant="graydark"
          typeButtom="percentage"
        />
        <ButtonCalculator
          onPress={() => handleCalculation('divided')}
          variant="violetdark"
          typeButtom="divided"
        />
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
        <ButtonCalculator
          onPress={() => handleCalculation('times')}
          variant="violetdark"
          typeButtom="times"
        />
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
        <ButtonCalculator
          onPress={() => handleCalculation('minus')}
          variant="violetdark"
          typeButtom="minus"
        />
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
        <ButtonCalculator
          onPress={() => handleCalculation('sum')}
          variant="violetdark"
          typeButtom="sum"
        />
        <ButtonCalculator
          onPress={() => handleNegativeOrPositive()}
          variant="graydark"
          typeButtom="sumandminus"
        />
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
        <ButtonCalculator
          onPress={() => handleCalculation('equals')}
          variant="violetlight"
          typeButtom="equals"
        />
      </ContainerButtons>
    </Container>
  )
}
