export class School {
  name: string
  certificationIds: string[]

  constructor({ name }: { name: string }) {
    this.name = name
  }

  // TODO: allow multiple inserts
  // TODO: that doens't work, fix it
  addCertification(certificationId: string) {
    this.certificationIds.push(certificationId)
  }
}
