export class Contract {
  wallet

  constructor({ wallet }) {
    this.wallet = wallet
  }

  async createNewSchool({ name }) {
    return await this.wallet.callMethod({ method: 'createNewSchool', args: { name } })
  }

  async createNewCertificate({ name }) {
    return await this.wallet.callMethod({
      method: 'createNewCertificate',
      args: { name },
    })
  }

  async registerAsStudent() {
    return await this.wallet.callMethod({
      method: 'registerAsStudent',
    })
  }

  async issueCertificate({ certificateId, studentId }) {
    return await this.wallet.callMethod({
      method: 'addCertificateToStudent',
      args: { certificateId, studentId },
    })
  }

  async getSchoolById(schoolId) {
    return await this.wallet.viewMethod({ method: 'getSchoolById', args: { schoolId } })
  }

  async getCertificateBySchoolId(schoolId) {
    return await this.wallet.viewMethod({
      method: 'getCertificateBySchoolId',
      args: { schoolId },
    })
  }

  async getMyCertificates() {
    return await this.getCertificateBySchoolId(this.wallet.accountId)
  }

  async getStudentById(studentId) {
    return await this.wallet.viewMethod({ method: 'getStudentById', args: { studentId } })
  }

  async getMeAsStudent() {
    return await this.getStudentById(this.wallet.accountId)
  }

  async getAllStudents() {
    return await this.wallet.viewMethod({ method: 'getAllStudents' })
  }
}
