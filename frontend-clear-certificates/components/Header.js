import { Box, Button, Typography } from '@mui/material'
import React from 'react'

const Header = ({ signOut, accountId }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        p: 2,
        borderBottom: `1px solid #CCC`,
      }}
    >
      <Typography variant="h5" fontWeight={600}>
        ClearGov {'>'} ClearCertificates
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Typography variant="body1" fontWeight={500}>
          {accountId}
        </Typography>
        <Button variant="outlined" onClick={signOut}>
          Sign out from NEAR Wallet
        </Button>
      </Box>
    </Box>
  )
}

export default Header
