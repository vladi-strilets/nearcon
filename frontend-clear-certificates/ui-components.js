import { Box, Button, Typography } from '@mui/material'
import React from 'react'

export const SignInPrompt = ({ onClick }) => {
  return (
    <main style={{ height: '100vh' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h3" sx={{ marginBottom: 2 }}>
          ClearCertificates
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>Certify on-chain. Powered by ClearGov</Typography>
        <Button onClick={onClick} variant="contained">
          Sign in with NEAR Wallet
        </Button>
      </Box>
    </main>
  )
}

export function SignOutButton({ accountId, onClick }) {
  return <button onClick={onClick}>Sign out {accountId}</button>
}

export function EducationalText() {
  return (
    <>
      <p>
        Look at that! A Hello World app! This greeting is stored on the NEAR blockchain. Check
        it out:
      </p>
      <ol>
        <li>
          Look in <code>frontend/App.js</code> - you'll see <code>getGreeting</code> and{' '}
          <code>setGreeting</code> being called on <code>contract</code>. What's this?
        </li>
        <li>
          Ultimately, this <code>contract</code> code is defined in <code>./contract</code> –
          this is the source code for your{' '}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://docs.near.org/docs/develop/contracts/overview"
          >
            smart contract
          </a>
          .
        </li>
        <li>
          When you run <code>npm run deploy</code>, the code in <code>./contract</code> gets
          deployed to the NEAR testnet. You can see how this happens by looking in{' '}
          <code>package.json</code>.
        </li>
      </ol>
      <hr />
      <p>
        To keep learning, check out{' '}
        <a target="_blank" rel="noreferrer" href="https://docs.near.org">
          the NEAR docs
        </a>{' '}
        or look through some{' '}
        <a target="_blank" rel="noreferrer" href="https://examples.near.org">
          example apps
        </a>
        .
      </p>
    </>
  )
}
