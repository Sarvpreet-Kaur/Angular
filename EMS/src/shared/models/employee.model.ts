export interface Employee {

    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    designation: string;
    department: string;
    status: 'Active' | 'Inactive' | 'On Leave';
    joiningDate: Date;
    salary: number;
    address: string;
    profileImage: string;
    password?: string;
    projectId: string[];
}