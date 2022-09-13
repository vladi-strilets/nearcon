export class Student {
  certificationIds: string[];

  addCertification(certificationId: string) {
    this.certificationIds.push(certificationId);
    return this.certificationIds;
  }
}
