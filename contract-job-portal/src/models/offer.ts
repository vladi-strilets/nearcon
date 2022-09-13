export class Offer {
  companyId: string
  title: string
  // TODO: add a 'required' and 'good to have categories' of certifications
  certificationIds: string[]
  candidates: string[] = []
  selectedCantidate: string

  constructor({
    companyId,
    title,
    certificationIds,
  }: {
    companyId: string
    title: string
    certificationIds: string[]
  }) {
    this.companyId = companyId
    this.title = title
    this.certificationIds = certificationIds
  }

  addCandidate(candidateId: string) {
    this.candidates.push(candidateId)
    return this.candidates
  }

  selectCandidate(candidateId: string) {
    this.selectedCantidate = candidateId
  }

  // TODO: make it CRUD to be able to update and delete offers
}
