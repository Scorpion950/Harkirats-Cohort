type Employee = {
  name: string;
  startDate: Date;
};

type Manager1 = {
  name: string;
  department: string;
};

type TeamLead = Employee & Manager1; // we can use type like this for combining two types into one 

const teamLead: TeamLead = {
  name: "harkirat",
  startDate: new Date(),
  department: "Software developer"
};