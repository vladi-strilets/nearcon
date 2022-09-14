import { Alert, Box, Button, FormGroup, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

const RegisterSchoolForm = ({ contract }) => {
  const [loading, setIsLoading] = useState(false)
  const [successful, setSuccessful] = useState(false)
  const [school, setSchool] = useState(null)

  const hasSchool = !!school

  useEffect(() => {
    const getSchool = async () => {
      try {
        const mySchoolId = contract.wallet.accountId
        const resSchool = await contract.getSchoolById(mySchoolId)
        setSchool(resSchool)
      } catch (error) {}
    }
    getSchool()
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const { schoolName } = e.target.elements
      const schoolNameValue = schoolName.value
      await contract.createNewSchool({ name: schoolNameValue })
      setSuccessful(true)
    } catch (error) {
      console.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="h5" fontWeight={500}>
        1. Register as school
      </Typography>
      <form onSubmit={onSubmit}>
        <FormGroup>
          <TextField
            id="schoolName"
            variant="outlined"
            label="Name"
            size="small"
            margin="normal"
          />
          <Button type="submit" variant="contained" disabled={loading || hasSchool}>
            {loading ? 'Registering...' : 'Register'}
          </Button>
          {successful && <Typography>Your school was succesfully registered</Typography>}
          {hasSchool && (
            <Alert severity="success" sx={{ mt: 2 }}>
              Your school is already registered:{' '}
              <span style={{ fontWeight: 600 }}>{school?.name}</span>
            </Alert>
          )}
        </FormGroup>
      </form>
    </Box>
  )
}

export default RegisterSchoolForm
