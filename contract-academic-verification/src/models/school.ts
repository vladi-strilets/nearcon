export class School {
  name: string
  certificationIds: string[]

  constructor({ name }: { name: string }) {
    this.name = name
  }

  // TODO: allow multiple inserts
  addCertification(certificationId: string) {
    this.certificationIds.push(certificationId)
    return this.certificationIds
  }
}
