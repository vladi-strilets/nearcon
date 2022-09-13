import { Box, Button, FormGroup, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

const RegisterSchoolForm = ({ contract }) => {
  const [loading, setIsLoading] = useState(false)
  const [successful, setSuccessful] = useState(false)

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
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </Button>
          {successful && <Typography>Your school was succesfully registered</Typography>}
        </FormGroup>
      </form>
    </Box>
  )
}

export default RegisterSchoolForm
