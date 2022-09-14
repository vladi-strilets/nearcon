export class Offer {
  companyId: string
  title: string
  // TODO: add a 'required' and 'good to have categories' of certificates
  certificateIds: string[]
  candidates: string[] = []
  selectedCantidate: string

  constructor({
    companyId,
    title,
    certificateIds,
  }: {
    companyId: string
    title: string
    certificateIds: string[]
  }) {
    this.companyId = companyId
    this.title = title
    this.certificateIds = certificateIds
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
