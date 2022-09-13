import { Box, Button, FormGroup, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

const IssueCertificateToStudentForm = ({ contract }) => {
  const [loading, setIsLoading] = useState(false)
  const [certificates, setCertificates] = useState([])
  const [selectedCertificateId, setSelectedCertificateId] = useState('')
  const [successful, setSuccessful] = useState(false)

  const normalizedCertificates = certificates.map((certificate) => ({
    value: certificate.id,
    label: certificate.name,
  }))

  const handleCertificateIdChange = (e, value) => {
    setSelectedCertificateId(value)
  }

  const refreshListOfcertificates = async () => {
    try {
      const certificates = await contract.getCertifications()
      setCertificates(certificates)
    } catch (error) {
      console.error(error.message)
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const { certificateId, studentId } = e.target.elements
    const certificateIdValue = certificateId.value
    const studentIdValue = studentId.value

    try {
      setIsLoading(true)
      await contract.issueCertificate({
        certificateId: certificateIdValue,
        studentId: studentIdValue,
      })
      setSuccessful(true)
    } catch (error) {
      console.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h5" fontWeight={500}>
          4. Issue a new certificate
        </Typography>
        <form onSubmit={onSubmit}>
          <FormGroup>
            <TextField
              id="certificateId"
              select
              size="small"
              margin="normal"
              value={selectedCertificateId}
              onChange={handleCertificateIdChange}
              label="Select a certificate"
              SelectProps={{
                onOpen: refreshListOfcertificates,
              }}
            >
              {normalizedCertificates.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="studentNearAccountId"
              variant="outlined"
              label="Student NEAR account"
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
    </>
  )
}

export default IssueCertificateToStudentForm
