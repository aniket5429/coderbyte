# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

*** The relation of facitlites to shifts can be seen as one to one relationship. The structure of the above database can be somewhat seen in the below no-sql structure. The report is based solely on the dependancy of shift which can be used to identify the total number of hours recorded and which can filtered by agent or facility.***

```bash
facility: {
    id: '',
    name: '',
}

agent: {
    id: '',
    name: '',
}

shift: {
    id: '',
    facility_id: '',
    agent_id: '',
    shift_start_timestamp: '',
    shift_end_timestamp: '',
}
```

***Now in order for facilities to generate their own report solely dependent on their document irrelevant of overall shifts. In order to achieve this, we can ensure that everytime a facility is being added to the shift, the same replica of data can be stored in facility tables as well as shown below.***

```bash
facility: {
    id: '',
    name: '',
    shift_details: {
        agent_id: '',
        shift_start_timestamp: '',
        shift_end_timestamp: '',
    }
}

agent: {
    id: '',
    name: '',
}

shift: {
    id: '',
    facility_id: '',
    agent_id: '',
    shift_start_timestamp: '',
    shift_end_timestamp: '',
}
```

***Based on the above document, the shift details can be considered as a common representation. This would always help if a single facility cannot have access to other facilities data and can help in tracking internal reports by agent and total number of working hours whereas an overall report can be used to compare dashboard/chart around how individual/overall the facilities are performing.***


```bash
facility: {
    id: '',
    name: '',
    shift_details: {
        agent_id: '',
        shift_start_timestamp: '',
        shift_end_timestamp: '',
    }
}

agent: {
    id: '',
    name: '',
}

shift: {
    id: '',
    facility_id: '',
    agent_id: '',
    shift_start_timestamp: '',
    shift_end_timestamp: '',
}
```

Important Note: We can always use RDBMS approach and store the shift details (shift schema without facility) details in a seperate table which will be as a foreign key to the facitlity table as shown below: 

```bash
shift: {
    id: '',
    agent_id: '',
    shift_start_timestamp: '',
    shift_end_timestamp: '',
}

facility: {
    id: '',
    name: '',
    shift: models.ForeignKey('shift')
}
```

But then everytime we need to look for the details or generate report, we would have to perform joins to both tables. 
Depending upon the higher usecases, we can debate around which type of db to use but for the scope of this question, we would consider
no-sql due to its speed.

