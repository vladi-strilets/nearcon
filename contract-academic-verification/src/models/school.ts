export class School {
  name: string
  certificateIds: string[]

  constructor({ name }: { name: string }) {
    this.name = name
  }

  // TODO: allow multiple inserts
  // TODO: that doens't work, fix it
  addCertificate(certificateId: string) {
    this.certificateIds.push(certificateId)
  }
}
