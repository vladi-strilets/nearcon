import { assert, call, near, NearBindgen, UnorderedMap, view } from 'near-sdk-js'
import { Certificate } from './models/certificate'
import { School } from './models/school'
import { Student } from './models/student'

@NearBindgen({})
class AcademicVerification {
  schools: UnorderedMap = new UnorderedMap('schools')
  certification: UnorderedMap = new UnorderedMap('certifications')
  students: UnorderedMap = new UnorderedMap('certifications')

  @call({})
  createNewSchool({ name }: { name: string }) {
    const schoolId = near.predecessorAccountId()
    const school = new School({ name })
    this.schools.set(schoolId, school)
    near.log(`School '${name}' was created`)
    return school
  }

  @call({})
  createNewCertification({ name }: { name: string }) {
    const schoolId = near.predecessorAccountId()
    const certificationId = near.randomSeed()
    const certification = new Certificate({ schoolId, name })
    this.certification.set(certificationId, certification)
    near.log(`Certification '${name}' was added to your school '${schoolId}'`)
    return certification
  }

  @call({})
  registerAsStudent() {
    const studentId = near.predecessorAccountId()
    const student = new Student()
    this.students.set(studentId, student)
    near.log(`Student '${studentId}' was registered`)
    return student
  }

  @call({})
  addCertificationToStudent({
    certificationId,
    studentId,
  }: {
    certificationId: string
    studentId: string
  }) {
    const schoolId = near.predecessorAccountId()

    // check is school exists
    const school = this.schools.get(schoolId)
    assert(school !== null, 'School does not exist')

    // check if schoolId is the owner of the certificationId
    const certification = this.certification.get(certificationId) as Certificate
    assert(schoolId === certification.schoolId, 'School does not own this certification')

    const student = this.students.get(studentId) as Student

    // check if student exists
    assert(student !== null, 'Student does not exist')

    student.addCertification(certificationId)
    near.log(`Certification '${certificationId}' was added to student '${studentId}'`)

    return student
  }

  @view({})
  getSchoolById({ schoolId }: { schoolId: string }) {
    const school = this.schools.get(schoolId)
    assert(school !== null, 'School does not exist')
    return school
  }

  @view({})
  getCertificationById({ certificationId }: { certificationId: string }) {
    const certification = this.certification.get(certificationId)
    assert(certification !== null, 'Certification does not exist')
    return certification
  }

  @view({})
  getStudentById({ studentId }: { studentId: string }) {
    const student = this.students.get(studentId)
    assert(student !== null, 'Student does not exist')
    return student
  }
}
