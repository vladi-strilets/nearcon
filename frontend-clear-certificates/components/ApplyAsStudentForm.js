import { Alert, Box, Button, FormGroup, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

const ApplyAsStudentForm = ({ contract }) => {
  const [loading, setIsLoading] = useState(false)
  const [student, setStudent] = useState(null)
  const [myCertificates, setMyCertificates] = useState([])

  const hasMeAsStudent = !!student

  useEffect(() => {
    const getMeAsStudent = async () => {
      try {
        const resStudent = await contract.getMeAsStudent()
        setStudent(resStudent)

        // get list of my certificates
        if (resStudent.certificateIds != null && resStudent.certificateIds.length > 0) {
          const resCertificates = await contract.getCertificatesDetails({
            certificateIds: resStudent.certificateIds,
          })
          setMyCertificates(resCertificates)
        }
      } catch (error) {
        console.log('error', error.message)
      }
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
          {myCertificates.length > 0 && (
            <>
              <Typography variant="h6" fontWeight={500}>
                My certificates:
              </Typography>
              <Stack spacing={2}>
                {myCertificates.map((certificate, index) => (
                  <Alert key={index} sx={{ width: '100%' }}>
                    {certificate?.name}
                  </Alert>
                ))}
              </Stack>
            </>
          )}
        </FormGroup>
      </form>
    </Box>
  )
}

export default ApplyAsStudentForm
