export interface Project {

    id: string;
    projectName: string;
    description: string;
    client: string;
    projectManager: string;
    employeeIds: number[];
    priority: 'Low' | 'Medium' | 'High';
    status: 'Planning' | 'In Progress' | 'Completed' | 'On Hold';
    startDate: string;
    endDate: string;
    teamSize: number
}