import { StatusBar } from 'react-native'
import { ThemeProvider } from 'styled-components'
import { useFonts, Rubik_400Regular } from '@expo-google-fonts/rubik'

import theme from './src/theme'

import { Calculator } from './src/screens/Calculator'
import { Loading } from './src/components/Loading'

export default function App() {
  const [fontsLoaded] = useFonts({ Rubik_400Regular })

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Calculator /> : <Loading />}
    </ThemeProvider>
  )
}
