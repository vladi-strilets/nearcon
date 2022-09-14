import { Box, Button, FormGroup, MenuItem, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

const IssueCertificateToStudentForm = ({ contract }) => {
  const [loading, setIsLoading] = useState(false)
  const [certificates, setCertificates] = useState([])
  const [students, setStudents] = useState([])
  const [selectedCertificateId, setSelectedCertificateId] = useState('')
  const [selectedStudentId, setSelectedStudentId] = useState('')

  const loadCertificates = async () => {
    try {
      const resCertificates = await contract.getMyCertifications()
      setCertificates(resCertificates)
    } catch (error) {
      console.error(error.message)
    }
  }

  const loadStudents = async () => {
    try {
      const resStudents = await contract.getAllStudents()
      setStudents(resStudents)
    } catch (error) {}
  }

  const normalizedCertificates = certificates.map((certificate) => ({
    value: certificate.id,
    label: certificate.name,
  }))

  const normalizedStudents = students.map((student) => ({
    value: student.id,
    label: student.id,
  }))

  const handleCertificateIdChange = (e) => {
    setSelectedCertificateId(e.target.value)
  }

  const handleSelectedStudentIdChange = (e) => {
    setSelectedStudentId(e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    // TODO: add validations

    try {
      setIsLoading(true)
      await contract.issueCertificate({
        certificateId: selectedCertificateId,
        studentId: selectedStudentId,
      })
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
        3. Issue a new certificate
      </Typography>
      <form onSubmit={onSubmit}>
        <FormGroup>
          <TextField
            id="certificates"
            select
            size="small"
            margin="normal"
            value={selectedCertificateId}
            onChange={handleCertificateIdChange}
            label="Select a certificate"
            SelectProps={{
              onOpen: loadCertificates,
            }}
          >
            {normalizedCertificates.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="students"
            select
            size="small"
            margin="normal"
            value={selectedStudentId}
            onChange={handleSelectedStudentIdChange}
            label="Select a student"
            SelectProps={{
              onOpen: loadStudents,
            }}
          >
            {normalizedStudents.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? 'Issuing...' : 'Issue'}
          </Button>
        </FormGroup>
      </form>
    </Box>
  )
}

export default IssueCertificateToStudentForm
