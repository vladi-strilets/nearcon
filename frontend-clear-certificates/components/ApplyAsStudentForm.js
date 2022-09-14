import { Alert, Box, Button, FormGroup, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

const ApplyAsStudentForm = ({ contract }) => {
  const [loading, setIsLoading] = useState(false)
  const [student, setStudent] = useState(null)

  const hasMeAsStudent = !!student

  useEffect(() => {
    const getMeAsStudent = async () => {
      try {
        const resStudent = await contract.getMeAsStudent()
        setStudent(resStudent)
      } catch (error) {}
    }
    getMeAsStudent()
  }, [])

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
        Register as student
      </Typography>
      <form onSubmit={onSubmit}>
        <FormGroup>
          <Button type="submit" variant="contained" disabled={loading || hasMeAsStudent}>
            {loading ? 'Registering...' : 'Register'}
          </Button>
          {hasMeAsStudent && (
            <Alert severity="success" sx={{ mt: 2 }}>
              You are the register student already 😎
            </Alert>
          )}
        </FormGroup>
      </form>
    </Box>
  )
}

export default ApplyAsStudentForm
