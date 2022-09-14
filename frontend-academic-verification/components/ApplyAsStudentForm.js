import { Box, Button, FormGroup, Typography } from '@mui/material'
import React, { useState } from 'react'

const ApplyAsStudentForm = ({ contract }) => {
  const [loading, setIsLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      await contract.registerAsStudent()
    } catch (error) {
      console.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="h5" fontWeight={500}>
        Apply as student
      </Typography>
      <form onSubmit={onSubmit}>
        <FormGroup>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? 'Applying...' : 'Apply'}
          </Button>
        </FormGroup>
      </form>
    </Box>
  )
}

export default ApplyAsStudentForm
