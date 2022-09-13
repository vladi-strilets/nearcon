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
    <>
      <h2>3. Apply as student</h2>
      <form onSubmit={onSubmit} className="change">
        <label>Me, applying as a student</label>
        <div>
          <button disabled={loading}>{loading ? 'Loading' : 'Apply'}</button>
        </div>
      </form>
    </>
  )
}

export default ApplyAsStudentForm
