export type Route = {
  id: number;
  name: string;
  description: string;
  popularity: number; // 1-10 for fraud detection
};

export const routes: Route[] = [
  {
    id: 1,
    name: 'Downtown Express',
    description: 'Quickest way to the city center.',
    popularity: 9,
  },
  {
    id: 2,
    name: 'Crosstown Connector',
    description: 'Connects eastern and western suburbs.',
    popularity: 7,
  },
  {
    id: 3,
    name: 'University Loop',
    description: 'Services the main university campus.',
    popularity: 8,
  },
  {
    id: 4,
    name: 'Suburb Shuttle',
    description: 'A quiet route through residential areas.',
    popularity: 3,
  },
  {
    id: 5,
    name: 'Industrial Park Line',
    description: 'Mainly for commuters to the industrial park.',
    popularity: 4,
  },
];

export type ApplicationStatus = 'Pending' | 'Approved' | 'Rejected';

export type Application = {
  id: number;
  applicantId: number;
  applicantName: string;
  applicantAge: number;
  applicantIncome: number;
  applicantPriorApplications: number;
  routeId: number;
  status: ApplicationStatus;
  dateApplied: string;
};

export const applications: Application[] = [
  {
    id: 101,
    applicantId: 1,
    applicantName: 'Alice Johnson',
    applicantAge: 25,
    applicantIncome: 45000,
    applicantPriorApplications: 0,
    routeId: 1,
    status: 'Approved',
    dateApplied: '2023-10-01',
  },
  {
    id: 102,
    applicantId: 1,
    applicantName: 'Alice Johnson',
    applicantAge: 25,
    applicantIncome: 45000,
    applicantPriorApplications: 0,
    routeId: 2,
    status: 'Pending',
    dateApplied: '2023-10-15',
  },
  {
    id: 103,
    applicantId: 2,
    applicantName: 'Bob Williams',
    applicantAge: 42,
    applicantIncome: 82000,
    applicantPriorApplications: 3,
    routeId: 2,
    status: 'Pending',
    dateApplied: '2023-10-18',
  },
  {
    id: 104,
    applicantId: 3,
    applicantName: 'Charlie Brown',
    applicantAge: 19,
    applicantIncome: 15000,
    applicantPriorApplications: 1,
    routeId: 3,
    status: 'Rejected',
    dateApplied: '2023-10-05',
  },
  {
    id: 105,
    applicantId: 4,
    applicantName: 'Diana Prince',
    applicantAge: 35,
    applicantIncome: 250000,
    applicantPriorApplications: 0,
    routeId: 1,
    status: 'Pending',
    dateApplied: '2023-10-20',
  },
  {
    id: 106,
    applicantId: 5,
    applicantName: 'Eve Adams',
    applicantAge: 68,
    applicantIncome: 22000,
    applicantPriorApplications: 5,
    routeId: 4,
    status: 'Pending',
    dateApplied: '2023-10-21',
  },
];

export type BusPass = {
  id: string;
  applicationId: number;
  applicantName: string;
  routeName: string;
  issueDate: string;
  expiryDate: string;
  status: 'Active' | 'Expired';
};

export const busPasses: BusPass[] = [
  {
    id: 'BPG-2023-101',
    applicationId: 101,
    applicantName: 'Alice Johnson',
    routeName: 'Downtown Express',
    issueDate: '2023-10-02',
    expiryDate: '2024-10-01',
    status: 'Active',
  },
];
