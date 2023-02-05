import styled from 'styled-components/native'
import {
  Percent,
  Divide,
  X,
  Minus,
  Plus,
  Equals,
  PlusMinus
} from 'phosphor-react-native'

export const PADDING_HORIZONTAL = 32

export const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
  background-color: ${({ theme }) => theme.COLORS.GRAY_800};

  padding: 54px ${PADDING_HORIZONTAL}px;
`

export const ContainerTop = styled.View`
  width: 100%;
  padding: 0px 22px;

  margin-bottom: 26px;
`

export const Calc = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SIZE_20}px;
  color: ${({ theme }) => theme.COLORS.GRAY_600};
  text-align: right;

  margin-bottom: 8px;
`

export const ContainerResult = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`

export const Result = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SIZE_36}px;
  color: ${({ theme }) => theme.COLORS.GRAY_100};
  text-align: right;

  flex: 1;
`

export const ContainerButtons = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`

export const IconDivided = styled(Divide).attrs(props => ({
  size: 20,
  color: props.theme.COLORS.GRAY_600
}))``

export const IconTimes = styled(X).attrs(props => ({
  size: 20,
  color: props.theme.COLORS.GRAY_600
}))``

export const IconMinus = styled(Minus).attrs(props => ({
  size: 20,
  color: props.theme.COLORS.GRAY_600
}))``

export const IconSum = styled(Plus).attrs(props => ({
  size: 20,
  color: props.theme.COLORS.GRAY_600
}))``

export const IconEquals = styled(Equals).attrs(props => ({
  size: 20,
  color: props.theme.COLORS.GRAY_600
}))``
