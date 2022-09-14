import React from 'react'
import 'regenerator-runtime'
import ApplyAsStudentForm from './components/ApplyAsStudentForm'
import CreateNewCertificate from './components/CreateNewCertificateForm'
import IssueCertificateToStudentForm from './components/IssueCertificateToStudent'
import RegisterSchoolForm from './components/RegisterSchoolForm'

import { SignInPrompt, SignOutButton } from './ui-components'

import CssBaseline from '@mui/material/CssBaseline'
import { Box, Typography } from '@mui/material'
import Header from './components/Header'

export default function App({ isSignedIn, contract, wallet }) {
  const signIn = () => {
    wallet.signIn()
  }

  const singOut = () => {
    wallet.signOut()
  }

  const getBody = () => {
    /// If user not signed-in with wallet - show prompt
    if (!isSignedIn) {
      // Sign-in flow will reload the page later
      return <SignInPrompt onClick={signIn} />
    }

    return (
      <>
        <Header signOut={singOut} accountId={wallet.accountId} />
        <Box component="main" sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <Box sx={{ flex: 1, p: 4, maxWidth: '600px', margin: '0 auto' }}>
            <Typography variant="h4" sx={{ paddingBottom: 2, textAlign: 'center' }}>
              Schools flow
            </Typography>
            <RegisterSchoolForm contract={contract} />
            <CreateNewCertificate contract={contract} />
            <IssueCertificateToStudentForm contract={contract} />
          </Box>
          <Box sx={{ flex: 1, p: 4, maxWidth: '600px', margin: '0 auto' }}>
            <Typography variant="h4" sx={{ paddingBottom: 2, textAlign: 'center' }}>
              Students flow
            </Typography>
            <ApplyAsStudentForm contract={contract} />
          </Box>
        </Box>
      </>
    )
  }

  return (
    <>
      <CssBaseline />
      {getBody()}
    </>
  )
}
