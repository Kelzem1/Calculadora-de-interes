import styled from 'styled-components'
import { useField } from 'formik'

const Control = styled.div`
    margin-bottom:20px;

`
const Label = styled.label`
    color: black; 
    display: block;
    margin-bottom:5px;

`
const MyInput = styled.input`
    outline: none;
    padding:8px;
    font-family: 'Rubik', sans-serif;
    border: solid 1px #301a4d;
    border-radius:4px;
    width:100%;
    margin-bottom: 5px;
`

const ErroMessage = styled.div`
    color: #f00;
`

const Input = ({ label, ...props}) => {
    const [field, meta] = useField(props)
    return( 
    <Control>
        <Label>{label}</Label>
        <MyInput {...field} {...props}/>
        {meta.touched && meta.error ? (
            <ErroMessage>{meta.error}</ErroMessage>
        ) : null
    }
    </Control>
    )
}

export default Input