export class Certificate {
  schoolId: string
  name: string

  constructor({ schoolId, name }: { schoolId: string; name: string }) {
    this.schoolId = schoolId
    this.name = name
  }
}
