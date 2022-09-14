export class Student {
  certificateIds: string[]

  addCertificate(certificateId: string) {
    this.certificateIds.push(certificateId)
    return this.certificateIds
  }
}
