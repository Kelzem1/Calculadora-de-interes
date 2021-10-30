import {useState} from 'react'
import { Formik, Form} from 'formik'
import * as Yup  from 'yup'
import Input from './components/Input'
import Button from './components/Button'
import Container from './components/Container'
import Section from './components/Section'
import Balance from './components/Balance'
import Titulo from './components/Titulo'


const compoundInterest = (deposit, contribution, years, rate) => {
  let total = deposit
  for (let i=0; i< years; i++){
    total= (total + contribution) * (rate + 1)
  }

  return Math.round(total)
}


const formatter = new Intl.NumberFormat('en-US',{
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits:2,
  maximumFractionDigits:2,
})

function App() {
  const [balance, setBalance] = useState('')
  const handleSubmit = ({deposit, contribution, years, rate}) => {
    const val = compoundInterest(Number(deposit),Number(contribution), Number(years), Number(rate))
    setBalance(formatter.format(val))
  }
  
  return (
    
    <Container>
    <Titulo>Calculadora de interes.</Titulo>
    <Section>
      <Formik
      initialValues={{
        deposit: '',
        contribution: '',
        years: '',
        rate: '',
      }}
      onSubmit= {handleSubmit }
      validationSchema={Yup.object({ 
        deposit: Yup.number().required('Obligatorio').typeError('Debe ser un numero'),
        contribution: Yup.number().required('Obligatorio').typeError('Debe ser un numero'),
        years: Yup.number().required('Obligatorio').typeError('Debe ser un numero'),
        rate: Yup.number().required('Obligatorio').typeError('Debe ser un numero'),
      })}
      >
        <Form>
          <Input name= "deposit" label="Deposito inicial"placeholder='Primer ingreso'/>
          <Input name= "contribution" label="Contribucion anual" placeholder='Cuanto ingresaras anulamente'/>
          <Input name= "years" label="Años" placeholder='Durante cuantos años' />
          <Input name= "rate" label="Interes estimado" placeholder='Porcentaje de interes. Ej: 10% = 0.1'/>
          <Button type="submit">Calcular</Button>
        </Form>
      </Formik>
      {balance !=='' ? <Balance>Balance final: {balance}</Balance> : null}
    </Section>
    </Container>
    )
}

export default App;
