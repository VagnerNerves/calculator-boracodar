import { StatusBar } from 'react-native'
import { ThemeProvider } from 'styled-components'

import theme from './src/theme'

import { Calculator } from './src/screens/Calculator'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Calculator />
    </ThemeProvider>
  )
}
