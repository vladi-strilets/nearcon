import { Alert, Box, Button, FormGroup, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

const CreateNewCertificate = ({ contract }) => {
  const [loading, setIsLoading] = useState(false)
  const [successful, setSuccessful] = useState(false)
  const [certificates, setCertificates] = useState([])

  useEffect(() => {
    const getCertificates = async () => {
      try {
        const resCertificates = await contract.getMyCertifications()
        setCertificates(resCertificates)
      } catch (error) {}
    }
    getCertificates()
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const { certificateName } = e.target.elements
      const certificateNameValue = certificateName.value
      await contract.createNewCertification({ name: certificateNameValue })
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
        2. Create a new certificate
      </Typography>
      <form onSubmit={onSubmit}>
        <FormGroup>
          <TextField
            id="certificateName"
            variant="outlined"
            label="Certification name"
            size="small"
            margin="normal"
          />
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? 'Creating...' : 'Create'}
          </Button>
          {successful && <Typography>A new certificate was succesfully created</Typography>}
          {certificates.length > 0 && (
            <>
              <Typography variant="h6" fontWeight={500}>
                Your certificates:
              </Typography>
              <Stack spacing={2}>
                {certificates.map((certificate, index) => (
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

export default CreateNewCertificate
