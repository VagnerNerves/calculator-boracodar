import { Dimensions, TouchableOpacity } from 'react-native'
import {
  Percent,
  Divide,
  X,
  Minus,
  Plus,
  Equals,
  PlusMinus
} from 'phosphor-react-native'

import styled from 'styled-components/native'

import { PADDING_HORIZONTAL } from '../../styles'

const QUANTITY_BUTTONS = 4
const SCREEN_HORIZONTAL_PADDING = (PADDING_HORIZONTAL * 2) / QUANTITY_BUTTONS

const MARGIN_LEFT = 12
const BUTTON_SIZE =
  Dimensions.get('screen').width / QUANTITY_BUTTONS -
  (SCREEN_HORIZONTAL_PADDING + MARGIN_LEFT)

export type ButtonVariant = 'graydark' | 'violetdark' | 'violetlight'

interface ButtonProps {
  variant: ButtonVariant
}

const buttonVariant = {
  graydark: 'GRAY_900',
  violetdark: 'VIOLET_800',
  violetlight: 'VIOLET_600'
} as const

export const Button = styled(TouchableOpacity)<ButtonProps>`
  width: ${BUTTON_SIZE}px;
  height: ${BUTTON_SIZE}px;

  background-color: ${props =>
    props.theme.COLORS[buttonVariant[props.variant]]};

  border-radius: 999px;

  margin-left: ${MARGIN_LEFT}px;
  margin-bottom: 12px;

  align-items: center;
  justify-content: center;
`

export type TextButtonColor = 'violet' | 'write'

interface TextButtonProps {
  colortext: TextButtonColor
  isSize_36?: boolean
}

const buttonColorText = {
  violet: 'VIOLET_500',
  write: 'GRAY_100'
} as const

export const TextButton = styled.Text<TextButtonProps>`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${props =>
    props.isSize_36
      ? props.theme.FONT_SIZE.SIZE_36
      : props.theme.FONT_SIZE.SIZE_24}px;
  color: ${props => props.theme.COLORS[buttonColorText[props.colortext]]};
`

export const IconPercent = styled(Percent).attrs(props => ({
  size: 28,
  color: props.theme.COLORS.GRAY_100
}))``

export const IconDivided = styled(Divide).attrs(props => ({
  size: 28,
  color: props.theme.COLORS.GRAY_100
}))``

export const IconTimes = styled(X).attrs(props => ({
  size: 28,
  color: props.theme.COLORS.GRAY_100
}))``

export const IconMinus = styled(Minus).attrs(props => ({
  size: 28,
  color: props.theme.COLORS.GRAY_100
}))``

export const IconSum = styled(Plus).attrs(props => ({
  size: 28,
  color: props.theme.COLORS.GRAY_100
}))``

export const IconEquals = styled(Equals).attrs(props => ({
  size: 28,
  color: props.theme.COLORS.GRAY_100
}))``

export const IconSumAndMinus = styled(PlusMinus).attrs(props => ({
  size: 28,
  color: props.theme.COLORS.GRAY_100
}))``
