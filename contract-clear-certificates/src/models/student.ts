export class Student {
  certificateIds: string[]

  constructor({ certificateIds = [] }: { certificateIds?: string[] } = {}) {
    this.certificateIds = certificateIds
  }

  // TODO: find how to make it work
  addCertificate(certificateId: string) {
    this.certificateIds.push(certificateId)
    return this.certificateIds
  }
}
