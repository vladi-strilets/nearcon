import { Box, Button, FormGroup, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

const CreateNewCertificate = ({ contract }) => {
  const [loading, setIsLoading] = useState(false)
  const [successful, setSuccessful] = useState(false)

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
          {successful && <Typography>Your school was succesfully registered</Typography>}
        </FormGroup>
      </form>
    </Box>
  )
}

export default CreateNewCertificate
