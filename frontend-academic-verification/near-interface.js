export class Contract {
  wallet

  constructor({ wallet }) {
    this.wallet = wallet
  }

  async createNewSchool(name) {
    return await this.wallet.callMethod({ method: 'createNewSchool', args: { name } })
  }

  async createNewCertification(name) {
    return await this.wallet.callMethod({
      method: 'createNewCertification',
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
      method: 'addCertificationToStudent',
      args: { certificateId, studentId },
    })
  }

  async getCertifications() {
    return await this.wallet.viewMethod({ method: 'getCertifications' })
  }

  // async getGreeting(){
  //   return await this.wallet.viewMethod({method: 'get_greeting'});
  // }

  // async setGreeting(greeting){
  //   return await this.wallet.callMethod({method: 'set_greeting', args:{message: greeting}});
  // }
}
