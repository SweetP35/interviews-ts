export interface IInterview {
	id: string;
	company: string;
	vacancyLink: string;
	hrName: string;
	contactTelegram?: string;
	contactWhatsApp?: string;
	contactPhone?: string;
	createdAt: Date
  salaryFrom?: number | null;
  salaryTo?: number | null;
  stages?: IStage[];
  result?: 'reject' | 'offer' | '';
}

export interface IInterviewForm {
  company: FieldState;
  vacancyLink: FieldState;
  hrName: FieldState;
  contactTelegram: FieldState;
  contactWhatsApp: FieldState;
  contactPhone: FieldState;
}

export interface FieldState {
  error: string;
  value: string;
}

export interface IStage {
  name: string;
  date: Date | null;
  description: string;
}

export interface IModifiers {
    top?: boolean;
    bottom?: boolean;
    left?: boolean;
    right?: boolean;
}

export interface IPieChartData {
  labels: string[];
  data: [number, number, number];
  colors?: string[];
}


